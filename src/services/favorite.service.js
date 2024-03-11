import { get } from "@/utils/request";
import { URL_FAVOR, URL_GET_FAVORITE_COURSES } from "../constants/url";
import http from "../utils/http";
import endpoints from "@/constants/endpoint";
const favoriteService = {
  toggle(body) {
    return http.post(URL_FAVOR, body);
  },
  getWishlist(page = 0) {
    return get(endpoints.getWishlist, {
      page: page,
    });
  },
  fetchInitialFavorite(courseId) {
    return http.get(`${URL_FAVOR}get-favor-by-course-id/${courseId}`);
  },
};

export default favoriteService;
