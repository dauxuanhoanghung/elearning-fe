import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AddIcon from "@mui/icons-material/Add";

import CourseContainer from "@/components/CourseContainer/index";
import { Skeleton } from "@/components/common";
import { courseService } from "@/services";

const MyBusinessPage = () => {
  const { t } = useTranslation();

  //#region Course
  const pageQuery = useQuery({
    queryKey: ["mybusiness:totalPage"],
    queryFn: () => courseService.countTotalPage(),
  });
  const {
    isLoading: paginationLoading,
    isError: paginationError,
    data: pageQueryData,
  } = pageQuery;
  const totalPage = pageQueryData?.data;

  const [page, setPage] = useState(0);

  // Use the query result object to render the data
  const {
    isLoading,
    isError,
    data: courses,
  } = useQuery({
    queryKey: ["mybusiness:courses", { page }], // The query key is an array with the page number
    queryFn: async () => {
      const res = await courseService.getMyBusinessCourse(page);
      if (res.status === 200) return res.data;
      return [];
    }, // The query function returns a promise
    keepPreviousData: true,
    initialData: [],
  });
  const handleChangePage = (page) => {
    setPage(page - 1);
  };
  //#endregion

  return (
    <main className="container" data-component="my-business-page">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Business</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="text-4xl">My Courses</p>

      <div data-role="add-new-course">
        <div className="my-4 bg-gray-300 dark:bg-gray-700 ">
          <Link
            to="/course/create"
            className="text-decoration-none block text-center"
          >
            <div className="flex items-center justify-center rounded-lg p-4 text-black shadow-md transition duration-300 dark:text-white">
              <h6 className="text-lg font-semibold text-black dark:text-white">
                {t("business.addNew")}
              </h6>
              <AddIcon className="h-10 w-10 " />
            </div>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <Skeleton />
      ) : (
        <div data-role="courses pt-5">
          <div className="">
            {courses.length === 0 && (
              <div className="m-8 w-full">
                <div className="rounded-lg bg-red-200 p-4">
                  <p className="text-red-600">
                    You never created a course before!!!
                  </p>
                </div>
              </div>
            )}
            <CourseContainer
              courses={courses}
              page={page}
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

export default MyBusinessPage;
