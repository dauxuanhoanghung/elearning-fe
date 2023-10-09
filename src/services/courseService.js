import {
  URL_COURSE,
  URL_CREATE_SECTION,
  URL_DELETE_COURSE_BY_ID,
  URL_GET_COUNT_LECTURES_BY_COURSE_ID,
  URL_GET_COUNT_REGISTRATIONS_BY_COURSE_ID,
  URL_GET_COURSE_BY_ID,
  URL_GET_CRITERIA_BY_ID,
  URL_GET_SECTION_BY_COURSE_ID,
  URL_GET_SECTION_LECTURES_BY_COURSE_ID,
  URL_MY_BUSINESS_COURSES,
  URL_TOTAL_COURSE_PAGE,
} from "../constants/url";
import http from "../utils/http";

const courseService = {
  getCourses(page = 0) {
    return http.get(URL_COURSE, {
      params: {
        page: page,
      },
    });
  },
  countTotalCoursePage() {
    return http.get(URL_TOTAL_COURSE_PAGE, {
      params: {},
    });
  },
  getMyCourse(page = 0) {
    return http.get(URL_MY_BUSINESS_COURSES, {
      params: {
        page: page,
        business: true,
      },
    });
  },
  getCourseById(id) {
    return http.get(URL_GET_COURSE_BY_ID(id));
  },
  /**
   *
   * @param {courseRequest, sections} body
   * @returns
   */
  create(body) {
    return http.post(URL_COURSE, body, {
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
    return http.post(URL_CREATE_SECTION, sections, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getSection(courseId) {
    return http.get(URL_GET_SECTION_BY_COURSE_ID(courseId));
  },
  getSectionAndLecturesByCourseId(courseId) {
    return http.get(URL_GET_SECTION_LECTURES_BY_COURSE_ID(courseId));
  },
  /**
   *
   * @param {id, name, description, price, backgroundFile, publishDate, createdDate, criteria, sections} body
   * @returns
   */
  update(body) {
    return http.put(URL_UPDATE_COURSE, body, {
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
    return http.delete(URL_DELETE_COURSE_BY_ID(id));
  },
  getCriteriaByCourseId(courseId) {
    return http.get(URL_GET_CRITERIA_BY_ID(courseId));
  },
  countLecturesByCourseId(courseId) {
    return http.get(URL_GET_COUNT_LECTURES_BY_COURSE_ID(courseId));
  },
  countRegistrationsByCourseId(courseId) {
    return http.get(URL_GET_COUNT_REGISTRATIONS_BY_COURSE_ID(courseId));
  },
};

export default courseService;
