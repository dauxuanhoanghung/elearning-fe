import endpoints from "@/constants/endpoint";
import { post } from "@/utils/request";

const authService = {
  /**
   *
   * @param {*} body
   * @returns
   */
  login(body) {
    return post(endpoints.login, body);
  },
  logout() {
    return post(endpoints.logout);
  },
  /**
   *
   * @param {username, password, confirmPassword, firstName, lastName, email, avatar} body
   * @returns
   */
  loginGoogle(body) {
    return post(endpoints.loginGoogle, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  register(body) {
    return post(endpoints.register, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default authService;
