import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Alert, Box } from "@mui/material";

import { Pagination, Skeleton } from "@/components/common";
import { courseService, favoriteService } from "@/services";
import CourseCard from "./CourseCard";

const CourseContainer = ({ isFavoritePage = false }) => {
  const pageQuery = useQuery({
    queryKey: ["totalPage"],
    queryFn: () => courseService.countTotalCoursePage(),
  });
  const {
    isLoading: paginationLoading,
    isError: paginationError,
    data: totalPage,
  } = pageQuery;
  const countPage = totalPage?.data;
  console.log("pageQuery: ", pageQuery);

  const [page, setPage] = useState(0);
  const courseQuery = useQuery({
    queryKey: ["courses", page], // The query key is an array with the page number
    queryFn: () =>
      isFavoritePage
        ? favoriteService.getFavoriteCourse(page)
        : courseService.getCourses(page), // The query function returns a promise
    keepPreviousData: true,
  });

  // Use the query result object to render the data
  const { isLoading, isError, data: res } = courseQuery;
  console.log("courseQuery", courseQuery);
  const courses = res?.data;

  const handleChangePage = (page) => {
    setPage(page - 1);
  };

  if (isError) return <h1>Something went wrong!!! ....</h1>;

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          [...Array(8)].map((_, i) => <Skeleton isRow={false} key={i} />)
        ) : (
          <>
            {courses?.length === 0 ? (
              <Box sx={{ margin: "30px", width: "100%" }}>
                <Alert severity="error" sx={{ width: "100%" }}>
                  Thers's no course for you !!! <Link to="/">Go to home</Link>
                </Alert>
              </Box>
            ) : (
              courses?.map((course, idx) => (
                <CourseCard {...course} key={idx} />
              ))
            )}
          </>
        )}
      </div>

      {!paginationLoading && countPage > 1 && (
        <Pagination
          totalPage={countPage}
          page={page + 1}
          onPageChange={handleChangePage}
        />
      )}
    </>
  );
};

export default CourseContainer;
