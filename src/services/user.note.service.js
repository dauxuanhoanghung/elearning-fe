import endpoints from "@/constants/endpoint";
import { deletes, get, post, put } from "@/utils/request";

const userNoteService = {
  /**
   *
   * @param {text, noteTime: int, lecture} body
   */
  createNote(body) {
    return post(endpoints.userNoteBase, body);
  },
  /**
   *
   * @returns
   */
  getAll() {
    return get(endpoints.userNoteBase);
  },
  /**
   *
   * @param {int} lectureId
   * @returns
   */
  getNotesByLecture(lectureId) {
    return get(endpoints.getNotesByLecture(lectureId));
  },
  update(body) {
    return put(endpoints.updateNote, body);
  },
  /**
   *
   * @param {*} id
   * @returns
   */
  deleteById(id) {
    return deletes(endpoints.deleteNoteById(id));
  },
};

export default userNoteService;
