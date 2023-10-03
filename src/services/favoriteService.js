import { URL_FAVOR, URL_GET_FAVORITE_COURSES } from "../constants/url";
import http from "../utils/http";
const favoriteService = {
  toggle(body) {
    return http.post(URL_FAVOR, body);
  },
  getFavoriteCourse(page = 0) {
    return http.get(URL_GET_FAVORITE_COURSES, {
      params: {
        page: page,
      },
    });
  },
  fetchInitialFavorite(courseId) {
    return http.get(`${URL_FAVOR}get-favor-by-course-id/${courseId}`);
  },
};

export default favoriteService;
