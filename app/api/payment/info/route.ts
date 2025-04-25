import { NextResponse } from "next/server";
import ECPayPayment from "ecpay-payment";

const ecpay = new ECPayPayment({
  MerchantID: process.env.ECPAY_MERCHANT_ID || "",
  HashKey: process.env.ECPAY_HASH_KEY || "",
  HashIV: process.env.ECPAY_HASH_IV || "",
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // 驗證綠界回傳的資料
    const isValid = ecpay.check_mac_value(data);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid check mac value" },
        { status: 400 }
      );
    }

    // 處理付款資訊
    const {
      MerchantTradeNo,
      RtnCode,
      RtnMsg,
      TradeNo,
      PaymentType,
      TradeAmt,
      PaymentDate,
    } = data;

    // TODO: 根據付款資訊更新訂單狀態
    console.log("Payment info:", {
      MerchantTradeNo,
      RtnCode,
      RtnMsg,
      TradeNo,
      PaymentType,
      TradeAmt,
      PaymentDate,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Payment info error:", error);
    return NextResponse.json(
      { error: "Payment info processing failed" },
      { status: 500 }
    );
  }
}
