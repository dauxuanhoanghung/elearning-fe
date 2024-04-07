import endpoints from "@/constants/endpoint";
import { get, post, put } from "@/utils/request";
const userService = {
  getCurrentUser() {
    return get(endpoints.currentUser);
  },
  /**
   * @param {username, firstName, lastName, password, confirmPassword, email, avatarFile, avatar (null)} body
   * @returns
   */
  register(body) {
    return post(endpoints.register, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /**
   * @param {username, firstName, lastName, email, avatarFile} body
   * @returns
   */
  updateAccount(body) {
    return put(endpoints.updateUserInfo, body, {
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
