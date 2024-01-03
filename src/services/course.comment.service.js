import { URL_COURSE_COMMENT, URL_GET_COMMENT_BY_COURSE_ID } from "../constants/url";
import http from "../utils/http";

const courseCommentService = {
  createComment(body) {
    return http.post(URL_COURSE_COMMENT, body);
  },
  getCommentsByCourseId(courseId, page = 0) {
    return http.get(URL_GET_COMMENT_BY_COURSE_ID(courseId), {
      params: {
        page: page,
      },
    });
  },
  deleteCommentsById(courseId) {
    return http.delete;
  },
};
export default courseCommentService;
