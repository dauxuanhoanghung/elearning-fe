import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CourseDetail() {
  const { courseId } = useParams();
  // Region course criteria
  const [listCriteria, setListCriteria] = useState([]);
  useEffect(() => {
    const getListCriteriaByCourseId = async (courseId) => {};
    getListCriteriaByCourseId(courseId);
  }, [courseId]);
  // Endregion
  // Region course comments
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const getCommentsByCourseId = async (courseId) => {};
    getCommentsByCourseId(courseId);
  }, [courseId, page]);
  // Endregion
  return (
    <>
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="URL_TO_COURSE_IMAGE" // Replace with the actual URL of the course image
            title="Course Image"
          />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Course Name
            </Typography>
            <Typography variant="body1">
              Course Description goes here. Provide a detailed description of
              the course.
            </Typography>
          </CardContent>
          <Button variant="contained" color="primary">
            Register
          </Button>
        </Card>
      </div>
    </>
  );
}

export default CourseDetail;
