import {
  URL_REGISTER,
  URL_LOGIN_GOOGLE,
  URL_CURRENT_USER,
  URL_USER,
} from "../constants/url";
import http from "../utils/http";
const userService = {
  getCurrentUser() {
    return http.get(`${URL_CURRENT_USER}`);
  },
  /**
   *
   * @param {username, firstName, lastName, password, confirmPassword, email, avatarFile, avatar (null)} body
   * @returns
   */
  register(body) {
    return http.post(URL_REGISTER, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateAccount(body) {
    return http.post(URL_USER, body);
  },
  /**
     *
     * @param {id} body
     * @returns {user}
    //  */
  // getUserBySlugOrId(body) {
  //   return http.get(URL_USER_BY_ID_OR_SLUG(body));
  // }
};

export default userService;
