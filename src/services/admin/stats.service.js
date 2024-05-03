import endpoints from "@/constants/endpoint";
import { get } from "@/utils/request";

const statsService = {
  statsByUser() {
    return get();
  },

  getUserByRole() {
    return get(endpoints.statsUserByRole);
  },
  getCourseByMostLectures(limit = 5) {
    return get(endpoints.statsCourseMostLectures, {
      limit: limit,
    });
  },
  getCourseByMostRegistration(limit = 5) {
    return get(endpoints.statsCourseMostRegistration, {
      params: {
        limit: limit,
      },
    });
  },
  countNumberOfUserByMonth(year) {
    return get(endpoints.statsUserRegisterByMonth, {
      year,
    });
  },
  countUserRegisterUntilMonth(year) {
    return get(endpoints.statsUserRegisterUntilMonth, {
      year,
    });
  },
  countUserInMonthAndTotal() {
    return get(endpoints.statsUserInMonthAndTotal);
  },
};

export default statsService;
