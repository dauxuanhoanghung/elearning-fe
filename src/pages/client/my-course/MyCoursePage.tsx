import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Skeleton } from "@/components/common";
import CourseContainer from "@/components/CourseContainer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { registrationService } from "@/services";
import { useState } from "react";

const MyCoursePage = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);

  //#region Course
  const { isError: paginationError, data: totalPage } = useQuery({
    queryKey: ["my-course:totalPage"],
    queryFn: async () => {
      const res = await registrationService.count();
      return Math.ceil(res.data / 8);
    },
  });

  // Use the query result object to render the data
  const {
    isLoading,
    isError,
    data: courses,
  } = useQuery({
    queryKey: ["my-course:courses", page], // The query key is an array with the page number
    queryFn: async () => {
      const res = await registrationService.getRegisteredCourses(page);
      if (res?.status === 200) return res.data;
      return [];
    }, // The query function returns a promise
    initialData: [],
  });

  const handleChangePage = (page: number) => {
    setPage(page - 1);
  };
  //#endregion

  return (
    <main className="container" data-component="my-learning-page">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t("my-course.home")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t("my-course.learning-course")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="text-4xl">{t("my-course.learning-course")}</p>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div data-role="courses pt-5">
          <div className="">
            {courses.length === 0 && (
              <div className="my-8 w-full">
                <div className="rounded-lg bg-red-200 p-4">
                  <p className="text-red-600">
                    Your never Learning before !!! Go back to choose a course
                    <Link to="/"> Go to home</Link>
                  </p>
                </div>
              </div>
            )}
            <CourseContainer
              courses={courses}
              page={parseInt(page + "")}
              totalPage={totalPage}
              onPageChange={handleChangePage}
              isError={isError || paginationError}
            />
          </div>
        </div>
      )}
    </main>
  );
};
export default MyCoursePage;
