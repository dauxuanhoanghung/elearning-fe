import React, { useEffect, useState } from "react";
import { Alert, Box, Grid } from "@mui/material";
import CourseCard from "./CourseCard";
import { courseService, favoriteService } from "../../services";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

const CourseContainer = ({ isFavoritePage = false }) => {
  const [loading, setLoading] = useState(true);
  //#region Course
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0)
  useEffect(() => {
    const getCourses = async () => {
      setLoading(prev => true);
      try {
        if (!isFavoritePage) {
          const res = await courseService.getCourses(page);
          setCourses(...courses, res.data.data);
        } else {
          const res = await favoriteService.getFavoriteCourse(page);
          setCourses(...courses, res.data.data);
        }
      } catch (error) {
      } finally {
        setLoading(prev => false);
      }
    };
    getCourses();
  }, [page]);
  //#endregion

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Grid container spacing={2}>
          {courses.length === 0 && (
            <Box container sx={{ margin: "30px", width: "100%" }}>
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
      )}
    </>
  );
};

export default CourseContainer;
