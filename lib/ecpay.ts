import crypto from "crypto";

export const ECPAY_CONFIG = {
  MerchantID: process.env.ECPAY_MERCHANT_ID || "",
  HashKey: process.env.ECPAY_HASH_KEY || "",
  HashIV: process.env.ECPAY_HASH_IV || "",
  ReturnURL: process.env.ECPAY_RETURN_URL || "",
  ClientBackURL: process.env.ECPAY_CLIENT_BACK_URL || "",
  OrderResultURL: process.env.ECPAY_ORDER_RESULT_URL || "",
  PaymentInfoURL: process.env.ECPAY_PAYMENT_INFO_URL || "",
  ClientRedirectURL: process.env.ECPAY_CLIENT_REDIRECT_URL || "",
};

export function createCheckMacValue(params: Record<string, string>): string {
  // 將參數按照字母順序排序
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  // 加上 HashKey 和 HashIV
  const checkString = `HashKey=${ECPAY_CONFIG.HashKey}&${sortedParams}&HashIV=${ECPAY_CONFIG.HashIV}`;

  // URL encode
  const encodedString = encodeURIComponent(checkString)
    .toLowerCase()
    .replace(/%20/g, "+")
    .replace(/%2d/g, "-")
    .replace(/%5f/g, "_")
    .replace(/%2e/g, ".")
    .replace(/%21/g, "!")
    .replace(/%2a/g, "*")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")");

  // 使用 SHA256 加密
  const hash = crypto
    .createHash("sha256")
    .update(encodedString)
    .digest("hex")
    .toUpperCase();

  return hash;
}

export function verifyCheckMacValue(params: Record<string, string>): boolean {
  const checkMacValue = params.CheckMacValue;
  delete params.CheckMacValue;

  const calculatedCheckMacValue = createCheckMacValue(params);
  return checkMacValue === calculatedCheckMacValue;
}
