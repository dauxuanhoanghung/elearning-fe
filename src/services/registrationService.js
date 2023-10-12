import { URL_REGISTRATION, URL_REGISTRATION_INIT } from "../constants/url";
import http from "../utils/http";
const registrationService = {
  /**
   *
   * @param {course} body
   * @returns
   */
  register(body) {
    return http.post(URL_REGISTRATION, body);
  },
  getInitialRegistration(courseId) {
    return http.get(URL_REGISTRATION_INIT(courseId));
  },
  // Standard:  https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1806000&vnp_Command=pay&vnp_CreateDate=20210801153333&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang+%3A5&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Fdomainmerchant.vn%2FReturnUrl&vnp_TmnCode=DEMOV210&vnp_TxnRef=5&vnp_Version=2.1.0&vnp_SecureHash=3e0d61a0c0534b2e36680b3f7277743e8784cc4e1d68fa7d276e79c23be7d6318d338b477910a27992f5057bb1582bd44bd82ae8009ffaf6d141219218625c42
  // My link:   https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1000000&vnp_Command=pay&vnp_CreateDate=20231012234516&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang+7188&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A3000%2Fsuccess%2Fp&vnp_TmnCode=SIBAERLS&vnp_TxnRef=7&vnp_Version=2.1.0&vnp_SecureHash=bbf016cb8576decf04af2a8d0039c1a6f3c54c97ca3260463e501de26e2579ac70a64b60176000f9518bdb8a4bb4f9f22044129c9403d84c26bc6f96a7c4b872
  payment(body) {
    return http.post("/api/payment/make", body);
  },
};

export default registrationService;
