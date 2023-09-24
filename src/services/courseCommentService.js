import http from "../utils/http";

const courseCommentService = {
  getCommentsByCourseId(courseId) {},
  deleteCommentsById(courseId) {
    return http.delete;
  },
};
export default courseCommentService;
