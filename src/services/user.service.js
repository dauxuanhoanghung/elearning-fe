import endpoints from "@/constants/endpoint";
import { deletes, get, post, put } from "@/utils/request";

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
  count(params) {
    return get(endpoints.countUsers, { ...params });
  },
  getList(params) {
    return get(endpoints.getAllUsers, { pageSize: 10, ...params });
  },
  getTopLectures(params = {}) {
    return get(endpoints.getTopLectures, { top: 5, ...params });
  },
  deleteSelf() {
    return deletes(endpoints.deleteSelf);
  },
};

export default userService;
