import endpoints from "@/constants/endpoint";
import { post } from "@/utils/request";

const authService = {
  /**
   *
   * @param {*} body
   * @returns
   */
  login(body: any): Promise<IResponse> {
    return post(endpoints.login, body);
  },
  logout(): Promise<IResponse> {
    return post(endpoints.logout);
  },
  /**
   *
   * @param {username, password, confirmPassword, firstName, lastName, email, avatar} body
   * @returns
   */
  loginGoogle(body: any): Promise<IResponse> {
    return post(endpoints.loginGoogle, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  register(body: any): Promise<IResponse> {
    return post(endpoints.register, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default authService;
