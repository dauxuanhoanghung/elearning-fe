import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Alert, Box, Grid, Pagination } from "@mui/material";

import { Skeleton } from "@/components/common";
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

  const handleChangePage = (event, value) => {
    setPage(value - 1);
  };

  if (isError) return <h1>Something went wrong!!! ....</h1>;

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {isLoading ? (
          [...Array(8)].map((_, i) => <Skeleton isRow={false} key={i} />)
        ) : (
          <div>
            {courses?.length === 0 && (
              <Box sx={{ margin: "30px", width: "100%" }}>
                <Alert severity="error" sx={{ width: "100%" }}>
                  Thers's no course for you !!! <Link to="/">Go to home</Link>
                </Alert>
              </Box>
            )}
            {courses?.map((course) => (
              <Grid item xs={12} sm={6} md={3} key={course.id}>
                <CourseCard {...course} />
              </Grid>
            ))}
          </div>
        )}
      </div>

      {countPage > 1 && (
        <Box sx={{ margin: "5px auto" }}>
          <Pagination
            count={countPage}
            page={page + 1}
            variant="outlined"
            color="secondary"
            onChange={handleChangePage}
          />
        </Box>
      )}
    </>
  );
};

export default CourseContainer;

const Old = () => {
  const [loading, setLoading] = useState(true);
  //#region Course
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const handleChangePage = (event, value) => {
    setPage(value - 1);
  };
  const [countPage, setCountPage] = useState(0);
  useEffect(() => {
    const getCourses = async () => {
      setLoading((prev) => true);
      try {
        if (!isFavoritePage) {
          const res = await courseService.getCourses(page);
          setCourses([...res.data]);
        } else {
          const res = await favoriteService.getFavoriteCourse(page);
          setCourses([...res.data.data]);
        }
      } catch (error) {
      } finally {
        setLoading((prev) => false);
      }
    };
    getCourses();
  }, [page]);
  useEffect(() => {
    const countTotalCoursePage = async () => {
      if (!isFavoritePage) {
        const res = await courseService.countTotalCoursePage();
        setCountPage(res.data);
      }
    };
    countTotalCoursePage();
  }, [isFavoritePage]);
  //#endregion
};
