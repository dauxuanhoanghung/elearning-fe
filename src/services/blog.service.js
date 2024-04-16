import endpoints from "@/constants/endpoint";
import { deletes, get, post } from "@/utils/request";

const blogService = {
  getBlogs() {
    return get(endpoints.blogBase);
  },
  getById(id) {
    return get(endpoints.getBlogById(id));
  },
  /**
   *
   * @param {*} body
   * @returns
   */
  create(body) {
    return post(endpoints.createBlog, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteById(id) {
    return deletes(deleteBlogById(id));
  },
};

export default blogService;
