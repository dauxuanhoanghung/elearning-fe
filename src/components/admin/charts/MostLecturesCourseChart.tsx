import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { statsService } from "@/services";

const MostLecturesCourseChart: React.FC = () => {
  const { t } = useTranslation();
  const [params] = useState<Object>({
    limit: 10,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["stats", "course", { ...params }],
    queryFn: async () => {
      const res = await statsService.getCourseByMostLectures(params);
      return res.data;
    },
    initialData: [],
  });

  const transformedData = [
    {
      data: data.map(({ name, countLectures }: any) => ({
        x: name,
        y: countLectures,
      })),
    },
  ];
  console.log(transformedData);
  return (
    <div data-chart="course-most-lecture" className="w-full">
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <Loader className="h-20 w-20" />
        </div>
      ) : (
        <Card className="p-4">
          <div className="mb-2 flex justify-between">
            <h4 className="text-navy-700 text-lg font-bold dark:text-white">
              {t("admin.stats.mostLectureCourse")}
            </h4>
          </div>
          <CardContent className="flex w-full items-center justify-center p-0">
            <Chart
              options={{
                markers: {
                  size: 0,
                },
                xaxis: {
                  categories: data.map((d: any) => d.name),
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
                tooltip: {
                  enabled: false,
                  custom: function ({
                    series,
                    seriesIndex,
                    dataPointIndex,
                    w,
                  }) {
                    const value = series[seriesIndex][dataPointIndex];
                    const label = w.globals.labels[dataPointIndex];
                    return `
                      <div class="bg-white dark:bg-gray-500 text-black dark:text-white p-2">
                        <h4 style="margin: 0; font-weight: bold;">${label}</h4>
                        <p style="margin: 5px 0 0 0; font-size: 14px;">Lecture Count: ${value}</p>
                      </div>
                    `;
                  },
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

export default MostLecturesCourseChart;
