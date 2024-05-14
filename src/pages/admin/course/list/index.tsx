// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const { data: count } = useQuery({
    queryKey: ["courses", "count"],
    queryFn: async () => {
      const res = await courseService.count();
      if (res.status === 200) return res.data;
      return 0;
    },
    initialData: 0,
    staleTime: 60000,
  });

  return (
    <main className="container" data-component="admin-list-courses-page">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t("admin.Home")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t("admin.coursePage")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <p className="text-4xl">
          {t("admin.coursePage")} ({count + ""})
        </p>
      </div>
      <div data-role="table-courses">
        <CourseTable />
      </div>
    </main>
  );
};

export default AdminListCoursePage;
