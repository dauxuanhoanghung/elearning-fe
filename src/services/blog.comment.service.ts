import endpoints from "@/constants/endpoint";
import { deletes, get, post } from "@/utils/request";

const blogCommentService = {
  /**
   *
   * @param {content, course(int)} body
   * @returns
   */
  create(body: any) {
    return post(endpoints.courseCommentBase, body);
  },
  getByCourseId(courseId: any, page = 0) {
    return get(endpoints.getCourseCommentById(courseId), {
      page: page,
    });
  },
  deleteById(commentId: any) {
    return deletes(endpoints.deleteCourseCommentById(commentId));
  },
};
export default blogCommentService;
