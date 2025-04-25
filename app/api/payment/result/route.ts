import { NextResponse } from "next/server";
import { verifyCheckMacValue } from "@/lib/ecpay";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    // 驗證綠界回傳的資料
    const isValid = verifyCheckMacValue(data);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid check mac value" },
        { status: 400 }
      );
    }

    // 處理付款結果
    const {
      MerchantTradeNo,
      RtnCode,
      RtnMsg,
      TradeNo,
      PaymentType,
      TradeAmt,
      PaymentDate,
    } = data;

    // TODO: 根據付款結果更新訂單狀態
    console.log("Payment result:", {
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
    console.error("Payment result error:", error);
    return NextResponse.json(
      { error: "Payment result processing failed" },
      { status: 500 }
    );
  }
}
