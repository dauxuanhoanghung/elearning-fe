import endpoints from "@/constants/endpoint";
import { deletes, get, post } from "@/utils/request";

const lectureService = {
  getLectures() {
    return get(endpoints.lectureBase);
  },
  getById(id: any, courseId: any) {
    return get(endpoints.getLectureById(id, courseId));
  },
  create(body: any) {
    return post(endpoints.createLecture, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteLectureById(id: any) {
    return deletes(endpoints.deleteLectureById(id));
  },
};

export default lectureService;
