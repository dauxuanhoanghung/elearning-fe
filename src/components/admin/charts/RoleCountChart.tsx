import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { statsService } from "@/services";

interface RoleCountChartProps {
  roleName: string;
  countUser: number;
}

const RoleCountChart = () => {
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["roles", "count"],
    queryFn: async () => {
      const res = await statsService.getUserByRole();
      return res.data;
    },
    initialData: [],
  });

  return (
    <div data-chart="count-user-by-role" className="w-full">
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <Loader className="h-20 w-20" />
        </div>
      ) : (
        <Card className="p-4">
          <div>
            <h4 className="text-navy-700 text-lg font-bold dark:text-white">
              {t("admin.stats.userByRole")}
            </h4>
          </div>
          <CardContent className="flex w-full items-center justify-center p-0">
            <Chart
              options={{
                states: {
                  hover: {
                    filter: {
                      type: "none",
                    },
                  },
                },
                legend: {
                  show: true,
                  position: "top",
                },
                dataLabels: {
                  enabled: true,
                },
                hover: { mode: null },
                tooltip: {
                  enabled: true,
                  theme: "dark",
                  style: {
                    fontSize: "12px",
                    backgroundColor: "#000000",
                  },
                },
                chart: {
                  width: "100%",
                  animations: {
                    enabled: true,
                    easing: "easeinout",
                    speed: 800,
                    animateGradually: {
                      enabled: true,
                      delay: 150,
                    },
                    dynamicAnimation: {
                      enabled: true,
                      speed: 350,
                    },
                  },
                },
                labels: data.map((d: RoleCountChartProps) => d.roleName),
              }}
              type="pie"
              style={{ width: "100%", height: "auto", minHeight: "none" }}
              series={data.map((d: RoleCountChartProps) => d.countUser)}
            />
          </CardContent>
        </Card>
      )}
      <div className="hidden"></div>
    </div>
  );
};

export default RoleCountChart;
