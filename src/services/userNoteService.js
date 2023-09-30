import { URL_USER_NOTE, URL_GET_NOTE_BY_LECTURE } from "../constants/url";
import http from "../utils/http";

const userNoteService = {
  /**
   *
   * @param {text, noteTime: int, lecture} body
   */
  createNote(body) {
    return http.post(URL_USER_NOTE, body);
  },
  getNotesByLecture(lectureId) {
    return http.get(URL_GET_NOTE_BY_LECTURE(lectureId));
  },
};

export default userNoteService;
