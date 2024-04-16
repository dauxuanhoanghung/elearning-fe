import { deletes, get, post, put } from "@/utils/request";
import {
  URL_DELETE_LECTURER_FORM_BY_ID,
  URL_GET_LECTURER_FORM_BY_CURRENT_USER,
  URL_LECTURER_APRROVAL,
  URL_LECTURER_REGISTRATION,
  URL_LECTURER_REJECT,
  URL_UPDATE_LECTURER_FORM_BY_CURRENT_USER,
} from "../constants/url";

const lecturerRegistrationService = {
  /**
   *
   * @param {file} body
   */
  registerLecturer(body) {
    return post(URL_LECTURER_REGISTRATION, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getLecturerFormByCurrentUser() {
    return get(URL_GET_LECTURER_FORM_BY_CURRENT_USER);
  },
  deleteLecturerFormByCurrentUser(id) {
    return deletes(URL_DELETE_LECTURER_FORM_BY_ID(id));
  },
  /**
   *
   * @param {file} body
   */
  updateLecturerFormByCurrentUser(id, body) {
    return put(URL_UPDATE_LECTURER_FORM_BY_CURRENT_USER(id), body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getAllForms(page = 0) {
    return get(URL_LECTURER_REGISTRATION, {
      page: page,
    });
  },
  approvalForm(id) {
    return post(URL_LECTURER_APRROVAL(id));
  },
  /**
   *
   * @param {*} body
   * @returns
   */
  rejectForm(body) {
    return post(URL_LECTURER_REJECT, body);
  },
};

export default lecturerRegistrationService;
