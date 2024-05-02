import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

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
import { courseService } from "@/services";

const MyCoursePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { page = 0 } = useSearchParams();

  //#region Course
  const {
    isLoading: paginationLoading,
    isError: paginationError,
    data: totalPage,
  } = useQuery({
    queryKey: ["mybusiness:totalPage"],
    queryFn: async () => {
      const res = await courseService.countTotalPage();
      return res.data;
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
      const res = await courseService.getMyLearningCourse(page);
      if (res?.status === 200) return res.data;
      return [];
    }, // The query function returns a promise
    keepPreviousData: true,
    initialData: [],
  });

  const handleChangePage = () => {
    navigate("/my-course", { page: page + 1 });
  };
  //#endregion

  return (
    <main className="container" data-component="my-learning-page">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Learning Courses</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="text-4xl">My Learning Courses</p>
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
export default MyCoursePage;
