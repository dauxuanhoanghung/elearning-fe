import endpoints from "@/constants/endpoint";
import { deletes, get, post, put } from "@/utils/request";

const userNoteService = {
  /**
   *
   * @param {text, noteTime: int, lecture} body
   */
  createNote(body: any): Promise<IResponse> {
    return post(endpoints.userNoteBase, body);
  },
  /**
   *
   * @returns
   */
  getAll(): Promise<IResponse> {
    return get(endpoints.userNoteBase);
  },
  /**
   *
   * @param {int} lectureId
   * @returns
   */
  getNotesByLecture(lectureId: number): Promise<IResponse> {
    return get(endpoints.getNotesByLecture(lectureId));
  },
  update(body: any): Promise<IResponse> {
    return put(endpoints.updateNote, body);
  },
  /**
   *
   * @param {*} id
   * @returns
   */
  deleteById(id: number): Promise<IResponse> {
    return deletes(endpoints.deleteNoteById(id));
  },
};

export default userNoteService;
