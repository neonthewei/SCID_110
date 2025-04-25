import { NextApiRequest, NextApiResponse } from "next";
import ECPayPayment from "ecpay-payment";
import crypto from "crypto";

// 格式化日期函數
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

// 產生 CheckMacValue
function generateCheckMacValue(
  params: Record<string, any>,
  HashKey: string,
  HashIV: string
): string {
  // 1. 將參數按照參數名稱的字母順序排序
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((obj: Record<string, any>, key) => {
      obj[key] = params[key];
      return obj;
    }, {});

  // 2. 將參數串接成 query string
  const queryString = Object.entries(sortedParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  // 3. 在串接的字串前後加上 HashKey 和 HashIV
  const rawString = `HashKey=${HashKey}&${queryString}&HashIV=${HashIV}`;

  // 4. 將串接後的字串做 URL encode
  const urlEncodedString = encodeURIComponent(rawString).toLowerCase();

  // 5. 將 encode 後的字串轉為小寫並替換特殊字符
  const lowerString = urlEncodedString
    .replace(/%20/g, "+")
    .replace(/%2d/g, "-")
    .replace(/%5f/g, "_")
    .replace(/%2e/g, ".")
    .replace(/%21/g, "!")
    .replace(/%2a/g, "*")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")")
    .replace(/%2f/g, "/"); // 添加斜線的轉換

  // 6. 進行 SHA256 加密
  const hash = crypto.createHash("sha256").update(lowerString).digest("hex");

  // 7. 將 SHA256 加密後的字串轉為大寫
  return hash.toUpperCase();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { orderId, amount, description } = req.body;

    // 基本參數
    const baseParams = {
      MerchantID: process.env.ECPAY_MERCHANT_ID || "",
      MerchantTradeNo: orderId,
      MerchantTradeDate: formatDate(new Date()),
      PaymentType: "aio",
      TotalAmount: amount,
      TradeDesc: encodeURIComponent(description),
      ItemName: encodeURIComponent(description),
      ReturnURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/callback`,
      ClientBackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/complete`,
      OrderResultURL: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/complete`,
      PaymentInfoURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/info`,
      ChoosePayment: "Credit",
      EncryptType: "1",
    };

    // 生成 CheckMacValue
    const checkMacValue = generateCheckMacValue(
      baseParams,
      process.env.ECPAY_HASH_KEY || "",
      process.env.ECPAY_HASH_IV || ""
    );

    // 構建最終參數
    const finalParams = new URLSearchParams();
    Object.entries(baseParams).forEach(([key, value]) => {
      finalParams.append(key, String(value));
    });
    finalParams.append("CheckMacValue", checkMacValue);

    // 構建重定向 URL
    const redirectUrl = `https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5`;

    // 創建 HTML 表單
    const formHtml = `
      <form id="ecpayForm" method="POST" action="${redirectUrl}" style="display: none;">
        ${Array.from(finalParams.entries())
          .map(
            ([key, value]) =>
              `<input type="hidden" name="${key}" value="${value}">`
          )
          .join("\n")}
      </form>
      <script>document.getElementById("ecpayForm").submit();</script>
    `;

    // 返回 HTML 表單
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(formHtml);
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ error: "Payment processing failed" });
  }
}
