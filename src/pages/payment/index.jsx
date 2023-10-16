import { Button, Card, CardContent, CardMedia, Container, List, ListItem, Typography } from "@mui/material";
import DefaultLayout from "../../layout";
import { useEffect, useState } from "react";
import { courseService, registrationService } from "../../services";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { isEmptyObject } from "../../utils/utils";

const PaymentPage = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const currentUser = useSelector((state) => state.user.user);
  // #region course detail
  /**
   * course {id, name, description, background(image), price(for button), creator, createdDate}
   */
  // #region Registration
  const [registration, setRegistration] = useState(false);
  useEffect(() => {
    if (registration) return;
    if (isEmptyObject(currentUser)) {
      showSnackbar({
        message: "Please login first to use to feature.",
        severity: "error",
      });
      navigate("/login");
      return;
    }
  })
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState({});
  useEffect(() => {
    const getCourseByCourseId = async (courseId) => {
      const res = await courseService.getCourseById(courseId);
      setCourseData(res.data.data);
      setLoading(false);
    };
    getCourseByCourseId(courseId);
  }, [courseId]);
  // #endregion

  const handlePayment = async () => {
    const res = await registrationService.payment({ course: courseId });
    console.log("payment_res: ", res);
    localStorage.setItem("courseId", res.data.courseId);
    window.location.href = res?.data.redirect_url;
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      {!loading &&
        <Container>
          <Typography variant="h2" sx={{ textAlign: "center" }}>PAYMENT</Typography>
          <Card>
            <CardMedia
              component="img"
              alt="Course Background"
              height="200"
              image={courseData.background}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">{courseData.description}</Typography>
              <Typography variant="h6">Price: {courseData.price}</Typography>
              <Typography variant="h5">Course Sections:</Typography>
              <List>
                {courseData.sections.map((section) => (
                  <ListItem key={section.id}>
                    <Typography variant="body1">{`${section.orderIndex}. ${section.sectionName}`}</Typography>
                  </ListItem>
                ))}
              </List>
              <Typography variant="h5">Created by:</Typography>
              <Typography>{`${courseData.user.firstName} ${courseData.user.lastName}`}</Typography>
            </CardContent>
          </Card>

          <Button variant="contained" color="primary" onClick={handlePayment}>
            Pay
          </Button>
        </Container>
      }
    </DefaultLayout>
  );
}

export default PaymentPage;