import RoleCountChart from "@/components/admin/charts/RoleCountChart";
import UserByMonthChart from "@/components/admin/charts/UserByMonthChart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const AdminStatsPage = () => {
  return (
    <main data-role="admin-stats-page">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Stats Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section data-section="section-user-chart" className="my-4">
        <h1 className="text-3xl font-semibold">User in system</h1>
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
        <h1 className="text-3xl font-semibold">Course in system</h1>
        <div className="grid grid-cols-2">
          <div></div>
          <div></div>
        </div>
      </section>
    </main>
  );
};

export default AdminStatsPage;
