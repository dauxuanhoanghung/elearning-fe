import { Link } from "react-router-dom";

import { Pagination, Skeleton } from "@/components/common";
import React from "react";
import { twMerge } from "tailwind-merge";
import CourseCard from "./CourseCard";

interface CourseContainerProps {
  courses: any[];
  page?: number;
  totalPage?: number;
  onPageChange: (page: number) => void;
  isCourseLoading?: boolean;
  paginationLoading?: boolean;
  isPaginationLoading?: boolean;
  isError?: boolean;
  isShowPagination?: boolean;
  isSearchPage?: boolean;
}

const CourseContainer: React.FC<CourseContainerProps> = ({
  courses,
  page,
  totalPage,
  isCourseLoading,
  onPageChange,
  paginationLoading = false,
  isError,
  isShowPagination = true,
  isSearchPage = false,
}) => {
  if (isError) return <h1>Something went wrong!!! ....</h1>;

  return (
    <div data-component="course-container">
      <div
        className={twMerge(
          "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4",
          isSearchPage ? "grid-cols-1 lg:grid-cols-1" : "",
        )}
      >
        {isCourseLoading ? (
          [...Array(8)].map((_, i) => <Skeleton isRow={isSearchPage} key={i} />)
        ) : (
          <>
            {courses?.length === 0 ? (
              <div className="my-8 w-full">
                <div className="rounded-lg bg-red-200 p-4">
                  {isSearchPage ? (
                    <p className="text-red-600">
                      No course match to your request. Please change it!!!
                    </p>
                  ) : (
                    <p className="text-red-600">
                      Your never Learning before !!! Go back to choose a course
                      <Link to="/"> Go to home</Link>
                    </p>
                  )}
                </div>
              </div>
            ) : (
              courses?.map((course, idx) => (
                <CourseCard {...course} key={idx} isSearchPage={isSearchPage} />
              ))
            )}
          </>
        )}
      </div>

      {isShowPagination && !paginationLoading && totalPage > 1 && (
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
