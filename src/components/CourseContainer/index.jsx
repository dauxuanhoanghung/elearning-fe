import React from "react";
import { Link } from "react-router-dom";

import { Alert, Box } from "@mui/material";

import { Pagination, Skeleton } from "@/components/common";
import CourseCard from "./CourseCard";

const CourseContainer = ({
  courses,
  page,
  totalPage,
  isCourseLoading,
  onPageChange,
  paginationLoading,
  isPaginationLoading,
  isError,
}) => {
  if (isError) return <h1>Something went wrong!!! ....</h1>;

  return (
    <div data-component="course-container">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {isCourseLoading ? (
          [...Array(8)].map((_, i) => <Skeleton isRow={false} key={i} />)
        ) : (
          <>
            {courses?.length === 0 ? (
              <Box sx={{ margin: "30px", width: "100%" }}>
                <Alert severity="error" sx={{ width: "100%" }}>
                  There&apos;s no course for you !!!{" "}
                  <Link to="/">Go to home</Link>
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

      {!paginationLoading && totalPage > 1 && (
        <Pagination
          totalPage={totalPage}
          page={page + 1}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default CourseContainer;
