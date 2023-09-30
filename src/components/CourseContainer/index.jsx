import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CourseCard from "../CourseCard";
import courseService from "../../services/courseService";

const CourseContainer = () => {
  //#region Course
  const [courses, setCourses] = useState([]);
  //#endregion
  useEffect(() => {
    const getCourses = async () => {
      const res = await courseService.getCourses();
      console.log("CourseContainer.getCourses >>> ", res.data.data);
      setCourses(...courses, res.data.data);
    };
    getCourses();
  }, []);

  return (
    <Grid container spacing={2}>
      {courses.map((course) => (
        <Grid item xs={12} sm={6} md={3} key={course.id}>
          <CourseCard {...course} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseContainer;
