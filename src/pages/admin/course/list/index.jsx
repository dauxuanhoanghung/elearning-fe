import { useQuery } from "@tanstack/react-query";

import CourseTable from "@/components/admin/courses/CourseTable";
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
  const { data: count } = useQuery({
    queryKey: ["courses", "count"],
    queryFn: async () => {
      const res = await courseService.count();
      if (res.status === 200) return res.data;
      return 0;
    },
    initialData: 0,
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
        <p className="text-4xl">Courses ({count + ""})</p>
      </div>
      <div data-role="table-courses">
        <CourseTable />
      </div>
    </main>
  );
};

export default AdminListCoursePage;
