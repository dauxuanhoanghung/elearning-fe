import endpoints from "@/constants/endpoint";
import { get, post } from "@/utils/request";

const favoriteService = {
  toggle(body: any): Promise<IResponse> {
    return post(endpoints.favoriteBase, body);
  },
  /**
   * @param { page } params
   * @returns
   */
  getWishlist(params = {}): Promise<IResponse> {
    return get(endpoints.getWishlist, {
      page: 0,
      ...params,
    });
  },
  countTotalPage(params = {}): Promise<IResponse> {
    return get(endpoints.countTotalWishlistPages, { ...params });
  },
  count(params = {}): Promise<IResponse> {
    return get(endpoints.countWishlist, { ...params });
  },
  /**
   *
   * @param {*} courseId integer
   * @returns
   */
  fetchInitialFavorite(courseId: any): Promise<IResponse> {
    return get(endpoints.getFavoriteByCourseId(courseId));
  },
};

export default favoriteService;
