import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { Alert, Box, Grid } from "@mui/material";

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
  console.log("pageQuery: ", pageQuery);

  const [page, setPage] = useState(0);
  const courseQuery = useQuery({
    queryKey: ["mybusiness:courses", page], // The query key is an array with the page number
    queryFn: () => courseService.getMyLearningCourse(page), // The query function returns a promise
    keepPreviousData: true,
  });

  // Use the query result object to render the data
  const { isLoading, isError, data: res } = courseQuery;
  console.log("mybusiness:courseQuery", courseQuery);
  const courses = res?.data;

  const handleChangePage = (page) => {
    setPage(page - 1);
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
        <>
          <Grid container spacing={2}>
            {courses?.length === 0 && (
              <>
                <Box container sx={{ margin: "30px", width: "100%" }}>
                  <Alert severity="error" sx={{ width: "100%" }}>
                    Your never Learning before !!! Go back to choose a course
                    <Link to="/"> Go to home</Link>
                  </Alert>
                </Box>
              </>
            )}
            <CourseContainer
              courses={courses}
              page={page}
              totalPage={totalPage}
              onPageChange={handleChangePage}
              isError={isError || paginationError}
            />
          </Grid>
        </>
      )}
    </main>
  );
};
export default MyCoursePage;
