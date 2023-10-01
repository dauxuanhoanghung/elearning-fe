import {
  URL_USER_NOTE,
  URL_GET_NOTE_BY_LECTURE,
  URL_DELETE_NOTE_BY_ID,
} from "../constants/url";
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
  deleteById(id) {
    return http.delete(URL_DELETE_NOTE_BY_ID(id));
  },
};

export default userNoteService;
