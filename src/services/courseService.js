import {
  URL_COURSE,
  URL_DELETE_COURSE_BY_ID,
  URL_GET_COURSE_BY_ID,
} from "../constants/url";
import http from "../utils/http";

const courseService = {
  getCourses() {
    return http.get(URL_COURSE);
  },
  getCourseById(id) {
    return http.get(URL_GET_COURSE_BY_ID(id));
  },
  /**
   *
   * @param {name, description, price, backgroundFile, publishDate, createdDate, criteria, sections} body
   * @returns
   */
  create(body) {
    return http.post(URL_COURSE, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /**
   * 
   * @param {id, name, description, price, backgroundFile, publishDate, createdDate, criteria, sections} body 
   * @returns 
   */
  update(body) {
    return http.put(URL_UPDATE_COURSE, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /**
   *
   * @param {*} id
   * @returns
   */
  deleteById(id) {
    return http.delete(URL_DELETE_COURSE_BY_ID(id));
  },
};

export default courseService;
