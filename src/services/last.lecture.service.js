import endpoints from "@/constants/endpoint";
import { get, post } from "@/utils/request";

const lastLectureService = {
  getList() {
    return get(endpoints.lastLecture);
  },
  getByCourse(courseId) {
    return get(endpoints.lastLectureByCourse, {
      courseId,
    });
  },
  updateByCourse(courseId, lectureId) {
    return post(endpoints.updateLastLecture, {
      courseId,
      lectureId,
    });
  },
};

export default lastLectureService;
