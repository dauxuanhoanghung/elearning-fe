import { useQuery } from "@tanstack/react-query";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { courseService } from "@/services";

const AdminListCoursePage = () => {
  const { data: count, countLoading } = useQuery({
    queryKey: ["courses", "count"],
    queryFn: () => courseService.count(),
  });

  const { data: courses, isLoading: courseLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await courseService.getAll();
      return res.data;
    },
    initialData: [],
  });

  return (
    <main className="container" data-component="admin-list-courses-page">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Course</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <p className="text-4xl">Courses ({count?.data})</p>
      </div>
      <div data-role="table-courses"></div>
    </main>
  );
};

export default AdminListCoursePage;
