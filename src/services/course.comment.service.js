import { get } from "@/utils/request";
import { URL_COURSE_COMMENT } from "../constants/url";
import http from "../utils/http";
import endpoints from "@/constants/endpoint";

const courseCommentService = {
  createComment(body) {
    return http.post(URL_COURSE_COMMENT, body);
  },
  getCommentsByCourseId(courseId, page = 0) {
    return get(endpoints.courseCommentById(courseId), {
      page: page,
    });
  },
  deleteCommentsById(courseId) {
    return http.delete;
  },
};
export default courseCommentService;
