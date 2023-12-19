import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Box, Breadcrumbs, Grid, Typography } from "@mui/material";
import DefaultLayout from "@/layout";
import { courseService } from "@/services";
import { titleStyle } from "@/utils/styles";
import CourseCard from "@/components/CourseContainer/CourseCard";
import MySkeleton from "@/components/MySkeleton";

const MyCoursePage = () => {
  const [loading, setLoading] = useState(false);
  //#region Course
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const fetchMyCourse = async () => {
      try {
        setLoading(true);
        const res = await courseService.getMyCourse(page);
        setCourses(res.data.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourse();
  }, [page]);
  //#endregion

  return (
    <DefaultLayout>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
        <Typography color="textPrimary">My Learning Courses</Typography>
      </Breadcrumbs>
      <Typography variant="h4" style={titleStyle}>
        My Learning Courses
      </Typography>
      {loading ? (
        <MySkeleton />
      ) : (
        <>
          <Grid container spacing={2}>
            {courses.length === 0 && (
              <>
                <Box container sx={{ margin: "30px", width: "100%" }}>
                  <Alert severity="error" sx={{ width: "100%" }}>
                    Your never Learning before !!! Go back to choose a course
                    <Link to="/"> Go to home</Link>
                  </Alert>
                </Box>
              </>
            )}
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={3} key={course.id}>
                <CourseCard {...course} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </DefaultLayout>
  );
};
export default MyCoursePage;
