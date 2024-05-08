import endpoints from "@/constants/endpoint";
import { deletes, get, post, put } from "@/utils/request";

const userNoteService = {
  /**
   *
   * @param {text, noteTime: int, lecture} body
   */
  createNote(body: any): Promise<any> {
    return post(endpoints.userNoteBase, body);
  },
  /**
   *
   * @returns
   */
  getAll(): Promise<any> {
    return get(endpoints.userNoteBase);
  },
  /**
   *
   * @param {int} lectureId
   * @returns
   */
  getNotesByLecture(lectureId: number): Promise<any> {
    return get(endpoints.getNotesByLecture(lectureId));
  },
  update(body: any): Promise<any> {
    return put(endpoints.updateNote, body);
  },
  /**
   *
   * @param {*} id
   * @returns
   */
  deleteById(id: number): Promise<any> {
    return deletes(endpoints.deleteNoteById(id));
  },
};

export default userNoteService;
