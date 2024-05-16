import endpoints from "@/constants/endpoint";
import { deletes, get, post, put } from "@/utils/request";

const courseService = {
  getList(params = {}): Promise<IResponse> {
    return get(endpoints.courseBase, {
      page: 0,
      ...params,
    });
  },
  count(params = {}): Promise<IResponse> {
    return get(endpoints.countCourse, {
      ...params,
    });
  },
  countTotalPage(params = {}): Promise<IResponse> {
    return get(endpoints.courseTotalPage, {
      ...params,
    });
  },
  getMyLearningCourse(page: number = 0): Promise<IResponse> {
    return get(endpoints.courseMyLearning, {
      page: page,
      learning: true,
    });
  },
  getMyBusinessCourse(page: number = 0): Promise<IResponse> {
    return get(endpoints.courseMyBusiness, {
      page: page,
      business: true,
    });
  },
  getById(id: number): Promise<IResponse> {
    return get(endpoints.courseById(id));
  },
  /**
   *
   * @param {courseRequest, sections} body
   * @returns
   */
  create(body: any): Promise<IResponse> {
    return post(endpoints.courseBase, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /**
   *
   * @param {id, name, description, price, backgroundFile, publishDate, createdDate, criteria, sections} body
   * @returns
   */
  update(body: any) {
    return put(endpoints.courseUpdate, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /**
   *
   * @param {*} id
   * @returns
   */
  deleteById(id: number): Promise<IResponse> {
    return deletes(endpoints.courseDeleteById(id));
  },
  getCriteriaByCourseId(courseId: number): Promise<IResponse> {
    return get(endpoints.courseCriteriaById(courseId));
  },
  countLecturesByCourseId(courseId: number): Promise<IResponse> {
    return get(endpoints.courseCountLecturesById(courseId));
  },
};

export default courseService;
