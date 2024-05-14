// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

import CourseContainer from "@/components/CourseContainer";
import { courseService } from "@/services";
import Sidebar from "./Sidebar";

const SearchCoursePage: React.FC = () => {
  const {
    isLoading,
    data: courses,
    error,
  } = useQuery({
    queryKey: ["courses", "search", {}],
    queryFn: async () => {
      const res = await courseService.getList();
      if (res.status === 200) return res.data;
      return [];
    },
    initialData: [],
  });

  return (
    <main className="md:container">
      <Sidebar />
      <div>
        {isLoading && <Loader className="h-20 w-20" />}
        <CourseContainer />
      </div>
    </main>
  );
};

export default SearchCoursePage;
