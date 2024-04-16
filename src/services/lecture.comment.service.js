import endpoints from "@/constants/endpoint";
import { deletes, get, post } from "@/utils/request";

const lectureCommentService = {
  /**
   *
   * @param {ContentBlock, lecture (int)} body
   * @returns
   */
  createComment(body) {
    return post(endpoints.lectureCommentBase, body);
  },
  getCommentsByLectureId(lectureId, page = 0) {
    return get(endpoints.getLectureCommentById(lectureId), {
      page: page,
    });
  },
  deleteCommentsById(id) {
    return deletes(endpoints.deleteLectureCommentById(id));
  },
};
export default lectureCommentService;
