import React from "react";
import { Link } from "react-router-dom";

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
              <div className="my-8 w-full">
                <div className="rounded-lg bg-red-200 p-4">
                  <p className="text-red-600">
                    Your never Learning before !!! Go back to choose a course
                    <Link to="/"> Go to home</Link>
                  </p>
                </div>
              </div>
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
