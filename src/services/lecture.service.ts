import endpoints from "@/constants/endpoint";
import { deletes, get, post } from "@/utils/request";

const lectureService = {
  getLectures(): Promise<IResponse> {
    return get(endpoints.lectureBase);
  },
  getById(id: any, courseId: any): Promise<IResponse> {
    return get(endpoints.getLectureById(id, courseId));
  },
  create(body: any): Promise<IResponse> {
    return post(endpoints.createLecture, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteLectureById(id: any): Promise<IResponse> {
    return deletes(endpoints.deleteLectureById(id));
  },
};

export default lectureService;
