import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Alert, Box, Grid, Pagination } from "@mui/material";

import { Skeleton } from "@/components/common";
import { courseService, favoriteService } from "@/services";
import CourseCard from "./CourseCard";

const CourseContainer = ({ isFavoritePage = false }) => {
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
          setCourses([...res.data.data]);
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
        setCountPage(res.data.data);
      }
    };
    countTotalCoursePage();
  }, [isFavoritePage]);
  //#endregion

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Grid container spacing={2}>
            {courses.length === 0 && (
              <Box sx={{ margin: "30px", width: "100%" }}>
                <Alert severity="error" sx={{ width: "100%" }}>
                  Thers's no course for you !!! <Link to="/">Go to home</Link>
                </Alert>
              </Box>
            )}
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={3} key={course.id}>
                <CourseCard {...course} />
              </Grid>
            ))}
          </Grid>
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
      )}
    </>
  );
};

export default CourseContainer;
