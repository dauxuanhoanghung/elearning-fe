import endpoints from "@/constants/endpoint";
import { deletes, get, post, put } from "@/utils/request";

const lecturerRegistrationService = {
  /**
   *
   * @param {file} body
   */
  registerLecturer(body) {
    return post(endpoints.lecturerRegistration, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getLecturerFormByCurrentUser() {
    return get(endpoints.lecturerRegistrationCurrentUser);
  },
  deleteLecturerFormByCurrentUser(id) {
    return deletes(endpoints.deleteLecturerRegistrationById(id));
  },
  /**
   *
   * @param {file} body
   */
  updateLecturerFormByCurrentUser(id, body) {
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
  approvalForm(id) {
    return post(endpoints.approveLecturerRegistrationById(id));
  },
  /**
   *
   * @param {*} body
   * @returns
   */
  rejectForm(body) {
    return post(endpoints.rejectLecturerRegistration, body);
  },
};

export default lecturerRegistrationService;
