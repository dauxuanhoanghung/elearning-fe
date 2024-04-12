import endpoints from "@/constants/endpoint";
import { deletes, get, post } from "@/utils/request";
import { URL_LECTURE } from "../constants/url";

const lectureService = {
  getLectures() {
    return get(endpoints.lectureBase);
  },
  getById(id) {
    return get(endpoints.getLectureById(id));
  },
  create(body) {
    return post(URL_LECTURE, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteLectureById(id) {
    return deletes(endpoints.deleteLectureById(id));
  },
};

export default lectureService;
