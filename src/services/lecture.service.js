import endpoints from "@/constants/endpoint";
import { deletes, get, post } from "@/utils/request";

const lectureService = {
  getLectures() {
    return get(endpoints.lectureBase);
  },
  getById(id, courseId) {
    return get(endpoints.getLectureById(id, courseId));
  },
  create(body) {
    return post(endpoints.createLecture, body, {
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
