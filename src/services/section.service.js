import endpoints from "@/constants/endpoint";
import { get } from "@/utils/request";

const sectionService = {
  getSections(courseId) {
    return get(endpoints.getSections(courseId));
  },
};

export default sectionService;
