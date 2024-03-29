import {
  URL_DELETE_LECTURER_FORM_BY_ID,
  URL_GET_LECTURER_FORM_BY_CURRENT_USER,
  URL_LECTURER_APRROVAL,
  URL_LECTURER_REGISTRATION,
  URL_LECTURER_REJECT,
  URL_UPDATE_LECTURER_FORM_BY_CURRENT_USER,
} from "../constants/url";
import http from "../utils/http";
const lecturerRegistrationService = {
  /**
   *
   * @param {file} body
   */
  registerLecturer(body) {
    return http.post(URL_LECTURER_REGISTRATION, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getLecturerFormByCurrentUser() {
    return http.get(URL_GET_LECTURER_FORM_BY_CURRENT_USER);
  },
  deleteLecturerFormByCurrentUser(id) {
    return http.delete(URL_DELETE_LECTURER_FORM_BY_ID(id));
  },
  /**
   *
   * @param {file} body
   */
  updateLecturerFormByCurrentUser(id, body) {
    return http.put(URL_UPDATE_LECTURER_FORM_BY_CURRENT_USER(id), body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getRegistrationForms(page = 0) {
    return http.get(URL_LECTURER_REGISTRATION, {
      params: {
        page: page,
      },
    });
  },
  approvalForm(id) {
    return http.post(URL_LECTURER_APRROVAL(id));
  },
  /**
   *
   * @param {*} body
   * @returns
   */
  rejectForm(body) {
    return http.post(URL_LECTURER_REJECT, body);
  },
};

export default lecturerRegistrationService;
