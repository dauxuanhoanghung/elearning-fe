import endpoints from "@/constants/endpoint";
import { get, post } from "@/utils/request";

const lastLectureService = {
  getList() {
    return get(endpoints.lastLecture);
  },
  getByCourse(courseId: any) {
    return get(endpoints.getLastLectureByCourse(courseId), {
      courseId,
    });
  },
  updateByCourse(courseId: any, lectureId: any) {
    return post(endpoints.updateLastLecture, {
      course: courseId,
      lecture: lectureId,
    });
  },
};

export default lastLectureService;
