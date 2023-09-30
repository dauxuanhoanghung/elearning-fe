import { URL_LECTURE_COMMENT, URL_GET_COMMENT_BY_LECTURE_ID } from "../constants/url";
import http from "../utils/http";

const lectureCommentService = {
  createComment(body) {
    return http.post(URL_LECTURE_COMMENT, body);
  },
  getCommentsByLectureId(lectureId, page = 0) {
    return http.get(URL_GET_COMMENT_BY_LECTURE_ID(lectureId), {
      params: {
        page: page,
      },
    });
  },
  deleteCommentsById(id) {
    return http.delete;
  },
};
export default lectureCommentService;
