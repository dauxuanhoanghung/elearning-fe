import endpoints from "@/constants/endpoint";
import { get } from "@/utils/request";
import { URL_REGISTER, URL_USER_UPDATE_INFO } from "../constants/url";
import http from "../utils/http";
const userService = {
  getCurrentUser() {
    return get(endpoints.currentUser);
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
  /**
   *
   * @param {username, firstName, lastName, email, avatarFile} body
   * @returns
   */
  updateAccount(body) {
    return http.put(URL_USER_UPDATE_INFO, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /**
     *
     * @param {id} body
     * @returns {user}
    //  */
  // getUserBySlugOrId(body) {
  //   return http.get(URL_USER_BY_ID_OR_SLUG(body));
  // }
  count(params) {
    return get(endpoints.countUsers, { ...params });
  },
  getTopLectures(params = {}) {
    return get(endpoints.getTopLectures, { top: 5, ...params });
  },
};

export default userService;
