import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import { Alert, Box, Breadcrumbs, Card, Grid, Typography } from "@mui/material";

import CourseCard from "@/components/CourseContainer/CourseCard";
import { Skeleton } from "@/components/common";
import DefaultLayout from "@/layout";
import { courseService } from "@/services";
import { titleStyle } from "@/utils/styles";

const MyBusinessPage = () => {
  const [loading, setLoading] = useState(true);
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
        <Typography color="textPrimary">My Business</Typography>
      </Breadcrumbs>
      <Typography variant="h4" style={titleStyle}>
        My Courses
      </Typography>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Grid container spacing={2}>
            {courses.length === 0 && (
              <>
                <Box container sx={{ margin: "30px", width: "100%" }}>
                  <Alert severity="error" sx={{ width: "100%" }}>
                    Your never create Course before !!!
                  </Alert>
                </Box>
              </>
            )}
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={3} key={course.id}>
                <CourseCard {...course} />
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={3}>
              <Link to="/course/create" style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    maxWidth: 345,
                    minHeight: 300,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Add a new course</Typography>
                  <AddIcon />
                </Card>
              </Link>
            </Grid>
          </Grid>
        </>
      )}
    </DefaultLayout>
  );
};

export default MyBusinessPage;
