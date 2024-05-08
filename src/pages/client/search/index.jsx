import { useQuery } from "@tanstack/react-query";

import CourseContainer from "@/components/CourseContainer";
import courseService from "@/services/course.service";
import Sidebar from "./Sidebar";

const SearchCoursePage = () => {
  const {
    isLoading,
    data: tags,
    error,
  } = useQuery({
    queryKey: ["tags", {}],
    queryFn: async () => {
      const res = await courseService.getAllTags();
      if (res.status === 200) return res.data;
      return [];
    },
    initialData: [],
  });
  return (
    <main className="md:container">
      <div>
        <Sidebar />
      </div>
      <div>
        <CourseContainer />
      </div>
    </main>
  );
};

export default SearchCoursePage;
