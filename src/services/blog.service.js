import {
  URL_BLOG,
  URL_DELETE_BLOG_BY_ID,
  URL_GET_BLOG_BY_ID,
} from "../constants/url";
import http from "../utils/http";

const blogService = {
  getBlogs() {
    return http.get(URL_BLOG);
  },
  getBlogById(id) {
    return http.get(URL_GET_BLOG_BY_ID(id));
  },
  deleteBlogById(id) {
    return http.delete(URL_DELETE_BLOG_BY_ID(id));
  },
};

export default blogService;
