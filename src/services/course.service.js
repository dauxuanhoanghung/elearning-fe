import endpoints from "@/constants/endpoint";
import { deletes, get, post, put } from "@/utils/request";

const courseService = {
  getCourses(page = 0, params = {}) {
    return get(endpoints.courseBase, {
      page: page,
      ...params,
    });
  },
  countTotalPage(params = {}) {
    return get(endpoints.courseTotalPage, {
      ...params,
    });
  },
  getMyLearningCourse(page = 0) {
    return get(endpoints.courseMyLearning, {
      page: page,
      learning: true,
    });
  },
  getMyBusinessCourse(page = 0) {
    return get(endpoints.courseMyBusiness, {
      page: page,
      business: true,
    });
  },
  getCourseById(id) {
    return get(endpoints.courseById(id));
  },
  /**
   *
   * @param {courseRequest, sections} body
   * @returns
   */
  create(body) {
    return post(endpoints.courseBase, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /**
   *
   * @param [] sections
   * @returns
   */
  createSection(sections) {
    return post(endpoints.courseCreateSection, sections, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getSection(courseId) {
    return get(endpoints.courseSectionById(courseId));
  },
  getSectionAndLecturesByCourseId(courseId) {
    return get(endpoints.courseSectionLecturesById(courseId));
  },
  /**
   *
   * @param {id, name, description, price, backgroundFile, publishDate, createdDate, criteria, sections} body
   * @returns
   */
  update(body) {
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
  deleteById(id) {
    return deletes(endpoints.courseDeleteById(id));
  },
  getCriteriaByCourseId(courseId) {
    return get(endpoints.courseCriteriaById(courseId));
  },
  countLecturesByCourseId(courseId) {
    return get(endpoints.courseCountLecturesById(courseId));
  },
  countRegistrationsByCourseId(courseId) {
    return get(endpoints.courseCountRegistrationsById(courseId));
  },
};

export default courseService;
