import endpoints from "@/constants/endpoint";
import { get } from "@/utils/request";

const statsService = {
  getUserByRole(): Promise<IResponse> {
    return get(endpoints.statsUserByRole);
  },
  getCourseByMostLectures(params: any): Promise<IResponse> {
    return get(endpoints.statsCourseMostLectures, {
      limit: 5,
      ...params,
    });
  },
  getCourseByMostRegistration(limit: number = 5): Promise<IResponse> {
    return get(endpoints.statsCourseMostRegistration, {
      limit: limit,
    });
  },
  countNumberOfUserByMonth(year: number): Promise<IResponse> {
    return get(endpoints.statsUserRegisterByMonth, {
      year,
    });
  },
  countUserRegisterUntilMonth(year: number): Promise<IResponse> {
    return get(endpoints.statsUserRegisterUntilMonth, {
      year,
    });
  },
  countUserInMonthAndTotal(): Promise<IResponse> {
    return get(endpoints.statsUserInMonthAndTotal);
  },
};

export default statsService;
