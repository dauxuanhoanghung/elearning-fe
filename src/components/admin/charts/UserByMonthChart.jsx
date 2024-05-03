import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Chart from "react-apexcharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statsService } from "@/services";
import { useState } from "react";

const UserByMonthChart = (props) => {
  const [year, setYear] = useState(new Date().getFullYear());

  const { data, isLoading } = useQuery({
    queryKey: ["stats", { year }],
    queryFn: async () => {
      const res = await statsService.countUserRegisterUntilMonth(year);
      console.log(res);
      return res.data;
    },
    initialData: [],
  });

  const transformedData = [
    {
      data: data.map(({ month, countUser }) => ({
        x: month,
        y: countUser,
      })),
    },
  ];
  console.log(transformedData);
  return (
    <div data-chart="count-user-by-role" className="w-full">
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <Loader className="h-20 w-20" />
        </div>
      ) : (
        <Card className="p-4">
          <div className="mb-2 flex justify-between">
            <h4 className="text-navy-700 text-lg font-bold dark:text-white">
              Number user through month
            </h4>
            <Select
              onValueChange={(value) => setYear(value)}
              defaultValue={year + ""}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CardContent className="flex w-full items-center justify-center p-0">
            <Chart
              options={{
                stroke: {
                  curve: "smooth",
                },
                markers: {
                  size: 0,
                },
                xaxis: {
                  categories: data.map((d) => d.month),
                },
                annotations: {
                  yaxis: [
                    {
                      y: 8800,
                      borderColor: "#00E396",
                      label: {
                        borderColor: "#00E396",
                        style: {
                          color: "#fff",
                          background: "#00E396",
                        },
                      },
                    },
                  ],
                },
              }}
              type="bar"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                minHeight: "unset",
              }}
              series={transformedData}
            />
          </CardContent>
        </Card>
      )}
      <div className="hidden"></div>
    </div>
  );
};

export default UserByMonthChart;
