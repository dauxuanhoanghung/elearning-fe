import { useTranslation } from "react-i18next";

import {
  MostLecturesCourseChart,
  RoleCountChart,
  UserByMonthChart,
} from "@/components/admin/charts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const AdminStatsPage = () => {
  const { t } = useTranslation();

  return (
    <main data-role="admin-stats-page">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t("admin.Home")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t("admin.statsPage")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section data-section="section-user-chart" className="my-4">
        <h1 className="text-3xl font-semibold">
          {t("admin.stats.userInSystem")}
        </h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <RoleCountChart />
          </div>
          <div className="col-span-2">
            <UserByMonthChart />
          </div>
        </div>
      </section>
      <section data-section="section-course-chart" className="my-4">
        <h1 className="text-3xl font-semibold">
          {t("admin.stats.courseInSystem")}
        </h1>
        <div className="grid grid-cols-1">
          <div>
            <MostLecturesCourseChart />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminStatsPage;
