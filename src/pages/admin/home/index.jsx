import { useQuery } from "@tanstack/react-query";
import { CarFrontIcon } from "lucide-react";

import { MultiUsersIcon, TimelinesIcon } from "@/components/Icons/index";
import { MostLecturesCourseChart } from "@/components/admin/charts";
import CardBoxWidget from "@/components/admin/dashboard/CardBoxWidget";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { statsService } from "@/services/index";

const AdminHomePage = () => {
  const {
    data: { month, total },
    isLoading: isLoadingCountUser,
    isError: isErrorCountUser,
  } = useQuery({
    queryKey: ["stats", "countUser"],
    queryFn: async () => {
      const { data } = await statsService.countUserInMonthAndTotal();
      return data;
    },
    initialData: {
      total: 0,
      month: 0,
    },
  });

  return (
    <main className="container" data-role="admin-dashboard">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section data-role="dashboard-content">
        <div className="mb-4 flex items-center justify-start">
          <span className="mr-3 inline-flex h-12 w-12 items-center justify-center rounded-full text-black dark:text-white">
            <TimelinesIcon />
          </span>
          <h1 className="text-3xl leading-tight">Overview</h1>
        </div>
        <div className="w-full">
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <CardBoxWidget
              trendLabel={((month / total) * 100.0).toFixed(2) + "%"}
              trendType="up"
              trendColor="success"
              iconColor="success"
              icon={MultiUsersIcon}
              number={total}
              label="Clients"
            />
            <CardBoxWidget
              trendLabel="16%"
              trendType="down"
              trendColor="danger"
              icon={CarFrontIcon}
              iconColor="info"
              number={7770}
              numberPrefix="$"
              label="Sales"
            />
            <CardBoxWidget
              trendLabel="Overflow"
              trendType="warning"
              trendColor="warning"
              icon={TimelinesIcon}
              iconColor="danger"
              number={256}
              numberSuffix="%"
              label="Performance"
            />
          </div>
        </div>
        <div className="mb-6 pt-6" data-role="chart">
          <div className="flex items-center justify-start">
            <span className="mr-2 inline-flex h-8 w-8 items-center justify-center">
              <svg viewBox="0 0 24 24" className="inline-block h-12 w-12">
                <path
                  fill="currentColor"
                  d="M11,2V22C5.9,21.5 2,17.2 2,12C2,6.8 5.9,2.5 11,2M13,2V11H22C21.5,6.2 17.8,2.5 13,2M13,13V22C17.7,21.5 21.5,17.8 22,13H13Z"
                ></path>
              </svg>
            </span>
            <h1 className="text-3xl leading-tight">Charts overview</h1>
          </div>
          <div className="flex gap-4">
            <MostLecturesCourseChart />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminHomePage;
