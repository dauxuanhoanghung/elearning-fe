import endpoints from "@/constants/endpoint";
import { deletes, get, post, put } from "@/utils/request";

const lecturerRegistrationService = {
  /**
   *
   * @param {file} body
   */
  registerLecturer(body: any) {
    return post(endpoints.lecturerRegistration, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getLecturerFormByCurrentUser() {
    return get(endpoints.lecturerRegistrationCurrentUser);
  },
  deleteLecturerFormByCurrentUser(id: any) {
    return deletes(endpoints.deleteLecturerRegistrationById(id));
  },
  /**
   *
   * @param {file} body
   */
  updateLecturerFormByCurrentUser(id: any, body: any) {
    return put(endpoints.updateLecturerRegistrationById(id), body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getList(page = 0) {
    return get(endpoints.lecturerRegistration, {
      page: page,
    });
  },
  approvalForm(id: any) {
    return post(endpoints.approveLecturerRegistrationById(id));
  },
  /**
   *
   * @param {*} body
   * @returns
   */
  rejectForm(body: any) {
    return post(endpoints.rejectLecturerRegistration, body);
  },
};

export default lecturerRegistrationService;
