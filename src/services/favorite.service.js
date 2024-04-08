import endpoints from "@/constants/endpoint";
import { get, post } from "@/utils/request";

const favoriteService = {
  toggle(body) {
    return post(endpoints.favoriteBase, body);
  },
  /**
   * @param { page } params
   * @returns
   */
  getWishlist(params = {}) {
    return get(endpoints.getWishlist, {
      page: 0,
      ...params,
    });
  },
  countTotalPage(params = {}) {
    return get(endpoints.countTotalWishlistPages, { ...params });
  },
  /**
   *
   * @param {*} courseId integer
   * @returns
   */
  fetchInitialFavorite(courseId) {
    return get(endpoints.getFavoriteByCourseId(courseId));
  },
};

export default favoriteService;
