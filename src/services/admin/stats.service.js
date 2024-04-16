import endpoints from "@/constants/endpoint";
import { get } from "@/utils/request";

const statsService = {
  statsByUser() {
    return get();
  },

  getCountUserByRole() {
    return get(endpoints.statsUserByRole);
  },
  getCourseByMostLectures(limit = 5) {
    return get(endpoints.statsCourseMostLectures, {
      params: {
        limit: limit,
      },
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
      params: {
        year,
      },
    });
  },
  countUserRegisterUntilMonth(year) {
    return get(endpoints.statsUserRegisterUntilMonth, {
      params: {
        year,
      },
    });
  },
  countUserInMonthAndTotal() {
    return get(endpoints.statsUserInMonthAndTotal);
  },
};

export default statsService;
