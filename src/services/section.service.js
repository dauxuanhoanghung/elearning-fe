import endpoints from "@/constants/endpoint";
import { get, post } from "@/utils/request";

const sectionService = {
  getList(courseId) {
    return get(endpoints.getListSections(courseId));
  },
  getSections(courseId) {
    return get(endpoints.getSections(courseId));
  },
  /**
   *
   * @param {course, name, orderIndex, } body
   * @returns
   */
  create(body) {
    return post(endpoints.createSection, body);
  },
  /**
   *
   * @param [] sections
   * @returns
   */
  createBatchSection(sections) {
    return post(endpoints.createBatchSection, sections, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default sectionService;
