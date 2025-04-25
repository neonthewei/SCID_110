declare module "ecpay-payment" {
  interface ECPayConfig {
    MerchantID?: string;
    HashKey?: string;
    HashIV?: string;
    ReturnURL?: string;
    ClientBackURL?: string;
    OrderResultURL?: string;
    PaymentInfoURL?: string;
    ClientRedirectURL?: string;
    MerchantTradeNo?: string;
    MerchantTradeDate?: string;
    TotalAmount?: number;
    TradeDesc?: string;
    ItemName?: string;
    ChoosePayment?: string;
    EncryptType?: number;
    IsTest?: boolean;
    TestMerchantID?: string;
    TestHashKey?: string;
    TestHashIV?: string;
  }

  interface PaymentClient {
    aio_check_out_all: (params: any) => string;
    get_check_mac_value: (params: any) => string;
  }

  interface ECPayPayment {
    payment_client: PaymentClient;
    check_mac_value: (params: any) => boolean;
    config: ECPayConfig;
  }

  class ECPayPaymentClass implements ECPayPayment {
    constructor(config: ECPayConfig);
    payment_client: PaymentClient;
    check_mac_value(params: any): boolean;
    config: ECPayConfig;
  }

  export default ECPayPaymentClass;
}
