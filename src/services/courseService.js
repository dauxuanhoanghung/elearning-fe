import { URL_COURSE, URL_GET_COURSE_BY_ID } from "../constants/url";
import http from "../utils/http";

const courseService = {
  getCourses() {
    return http.get(URL_COURSE);
  },
  getCourseById(id) {
    return http.get(URL_GET_COURSE_BY_ID(id));
  },
};

export default courseService;
