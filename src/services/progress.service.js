import endpoints from "@/constants/endpoint";
import { post } from "@/utils/request";

const progressService = {
  save(courseId) {
    return post(endpoints.getSections(courseId));
  },
};

export default progressService;
