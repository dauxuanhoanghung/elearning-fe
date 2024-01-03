import {
  URL_DELETE_LECTURE_BY_ID,
  URL_GET_LECTURE_BY_ID,
  URL_LECTURE,
} from "../constants/url";
import http from "../utils/http";

const lectureService = {
  getLectures() {
    return http.get(URL_LECTURE);
  },
  getLectureById(id) {
    return http.get(URL_GET_LECTURE_BY_ID(id));
  },
  create(body) {
    return http.post(URL_LECTURE, body, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  deleteLectureById(id) {
    return http.delete(URL_DELETE_LECTURE_BY_ID(id));
  },
};

export default lectureService;
