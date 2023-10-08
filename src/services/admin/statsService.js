import {
  URL_GET_COURSE_WITH_MOST_LECTURES,
  URL_GET_COURSE_WITH_MOST_REGISTRATION,
  URL_GET_USER_BY_ROLE,
  URL_GET_USER_REGISTER_BY_MONTH,
  URL_GET_USER_REGISTER_UNTIL_MONTH,
} from "../../constants/url";
import http from "../../utils/http";

const statsService = {
  getCountUserByRole() {
    return http.get(URL_GET_USER_BY_ROLE);
  },
  getCourseByMostLectures(limit) {
    return http.get(URL_GET_COURSE_WITH_MOST_LECTURES, {
      params: {
        limit: limit,
      },
    });
  },
  getCourseByMostRegistration(limit) {
    return http.get(URL_GET_COURSE_WITH_MOST_REGISTRATION, {
      params: {
        limit: limit,
      },
    });
  },
  countNumberOfUserByMonth(year) {
    return http.get(URL_GET_USER_REGISTER_BY_MONTH, {
      params: {
        year,
      },
    });
  },
  countUserRegisterUntilMonth(year) {
    return http.get(URL_GET_USER_REGISTER_UNTIL_MONTH, {
      params: {
        year,
      },
    });
  },
};

export default statsService;
