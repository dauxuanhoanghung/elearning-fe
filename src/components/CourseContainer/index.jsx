import React, { useEffect, useState } from "react";
import { Alert, Box, Grid } from "@mui/material";
import CourseCard from "../CourseCard";
import courseService from "../../services/courseService";
import favoriteService from "../../services/favoriteService";
import { Link } from "react-router-dom";

const CourseContainer = ({ isFavoritePage = false }) => {
  //#region Course
  const [courses, setCourses] = useState([]);
  //#endregion
  useEffect(() => {
    const getCourses = async () => {
      if (!isFavoritePage) {
        const res = await courseService.getCourses();
        setCourses(...courses, res.data.data);
      } else {
        const res = await favoriteService.getFavoriteCourse();
        setCourses(...courses, res.data.data);
      }
    };
    getCourses();
  }, []);

  return (
    <Grid container spacing={2}>
      {courses.length === 0 && (
        <Box container sx={{ margin: "30px", width: "100%"}}>
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
  );
};

export default CourseContainer;
