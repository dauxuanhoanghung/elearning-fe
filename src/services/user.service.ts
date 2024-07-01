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
  register(body: FormData): Promise<IResponse> {
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
  updateAccount(body: FormData): Promise<IResponse> {
    return put(endpoints.updateUserInfo, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  count(params: any = {}): Promise<IResponse> {
    return get(endpoints.countUsers, { ...params });
  },
  getList(params: { page?: number; search?: string }): Promise<IResponse> {
    return get(endpoints.getAllUsers, { pageSize: 10, ...params });
  },
  getTopLectures(params = {}): Promise<IResponse> {
    return get(endpoints.getTopLectures, { top: 5, ...params });
  },
  deleteSelf(): Promise<IResponse> {
    return deletes(endpoints.deleteSelf);
  },
  changePassword(body: {
    currentPassword: string;
    newPassword: string;
  }): Promise<IResponse> {
    return post(endpoints.changePassword, body);
  },

  payoutCredit(credit: number, username: string): Promise<IResponse> {
    return post(endpoints.payoutCredit, { credit, username });
  },
};

export default userService;
