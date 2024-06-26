import endpoints from "@/constants/endpoint";
import { get, post } from "@/utils/request";

const sectionService = {
  getSections(courseId: number): Promise<IResponse> {
    return get(endpoints.getSections(courseId));
  },
  /**
   *
   * @param {course, name, orderIndex, } body
   * @returns
   */
  create(body: any): Promise<IResponse> {
    return post(endpoints.createSection, body);
  },
  /**
   *
   * @param [] sections
   * @returns
   */
  createBatchSection(sections: any[]): Promise<IResponse> {
    return post(endpoints.createBatchSection, sections, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default sectionService;
