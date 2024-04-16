import endpoints from "@/constants/endpoint";
import { deletes, get, post } from "@/utils/request";

const courseCommentService = {
  /**
   *
   * @param {content, course(int)} body
   * @returns
   */
  createComment(body) {
    return post(endpoints.courseCommentBase, body);
  },
  getCommentsByCourseId(courseId, page = 0) {
    return get(endpoints.getCourseCommentById(courseId), {
      page: page,
    });
  },
  deleteCommentById(commentId) {
    return deletes(endpoints.deleteCourseCommentById(commentId));
  },
};
export default courseCommentService;
