import React, { useEffect, useState } from "react";
import { Alert, Box, Grid } from "@mui/material";
import CourseCard from "./CourseCard";
import { courseService, favoriteService } from "../../services";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

const CourseContainer = ({ isFavoritePage = false }) => {
  const [loading, setLoading] = useState(false);
  //#region Course
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      if (!isFavoritePage) {
        const res = await courseService.getCourses();
        setCourses(...courses, res.data.data);
      } else {
        const res = await favoriteService.getFavoriteCourse();
        setCourses(...courses, res.data.data);
      }
      setLoading(false);
    };
    getCourses();
  }, []);
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
