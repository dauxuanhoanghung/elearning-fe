import endpoints from "@/constants/endpoint";
import { get, post } from "@/utils/request";

const blogService = {
  getBlogs(): Promise<any> {
    return get(endpoints.blogBase);
  },
  getById(id: any): Promise<any> {
    return get(endpoints.getBlogById(id));
  },
  /**
   *
   * @param {*} body
   * @returns
   */
  create(body: any): Promise<any> {
    return post(endpoints.createBlog, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default blogService;
