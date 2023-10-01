import { URL_FAVOR, URL_GET_FAVORITE_COURSES } from "../constants/url";
import http from "../utils/http";
const registrationService = {
  toggle(body) {
    return http.post(URL_FAVOR, body);
  },
  getFavoriteCourse() {
    return http.get(URL_GET_FAVORITE_COURSES);
  },
  getInitialRegistration(courseId){
    return http.get(`${URL_FAVOR}get-favor-by-course-id/${courseId}`);
  }
};

export default registrationService;