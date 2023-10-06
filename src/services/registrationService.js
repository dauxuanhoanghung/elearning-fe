import { URL_REGISTRATION, URL_REGISTRATION_INIT } from "../constants/url";
import http from "../utils/http";
const registrationService = {
  /**
   *
   * @param {course} body
   * @returns
   */
  register(body) {
    return http.post(URL_REGISTRATION, body);
  },
  getInitialRegistration(courseId) {
    return http.get(URL_REGISTRATION_INIT(courseId));
  },
};

export default registrationService;
