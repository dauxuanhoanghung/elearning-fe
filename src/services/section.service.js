import endpoints from "@/constants/endpoint";
import { get, post } from "@/utils/request";

const sectionService = {
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
};

export default sectionService;
