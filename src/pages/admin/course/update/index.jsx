import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { Spinner } from "@/components/common";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { courseService } from "@/services";
import { isAdmin } from "@/utils/utils";
import LectureForm from "./LectureForm";
import SectionList from "./SectionList";

const CourseUpdatePage = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const currentUser = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!isAdmin(currentUser)) {
      showSnackbar({
        message: "You are not allowed to this Admin page.",
        severity: "error",
      });
      navigate("/");
    }
  }, []);
  const [sections, setSections] = useState([]);
  const fetchSectionsAndItsLectures = async () => {
    const res = await courseService.getSectionAndLecturesByCourseId(courseId);
    console.log(res);
    if (res.data.status === 200) {
      setSections(res.data.data);
    }
  };
  // #region course detail
  /**
   * course {id, name, description, background(image), price(for button), creator, createdDate}
   */
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState({});
  useEffect(() => {
    const getCourseByCourseId = async (courseId) => {
      const res = await courseService.getCourseById(courseId);
      console.log("course", courseData);
      setCourseData(res.data.data);
    };
    getCourseByCourseId(courseId);
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
    console.log(courseData);
  };
  const handleUpdate = () => {};
  // #endregion
  const [openLectureForm, setOpenLectureForm] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/admin" style={{ textDecoration: "none" }}>
          Admin
        </Link>
        <Typography color="textPrimary">Edit Course</Typography>
      </Breadcrumbs>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Grid container>
            <Grid item sm={12} md={12} lg={3}>
              <SectionList
                courseData={courseData}
                setCourseData={setCourseData}
                setOpenLectureForm={setOpenLectureForm}
                setSelectedSection={setSelectedSection}
                fetchSectionsAndItsLectures={fetchSectionsAndItsLectures}
                sections={sections}
                setSections={setSections}
              />
            </Grid>

            <Grid item sm={12} md={12} lg={9} padding={"20px"}>
              {openLectureForm && (
                <LectureForm
                  courseData={courseData}
                  setCourseData={setCourseData}
                  selectedSection={selectedSection}
                  setOpenLectureForm={setOpenLectureForm}
                  fetchSectionsAndItsLectures={fetchSectionsAndItsLectures}
                />
              )}
              {!openLectureForm && (
                <>
                  <Card>
                    <CardMedia
                      component="img"
                      height="400"
                      image={courseData.background}
                      alt={courseData.name}
                    />
                    <CardContent>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <TextField
                            label="Course Name"
                            name="name"
                            value={courseData.name}
                            onChange={handleInputChange}
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            type="number"
                            label="Price"
                            name="price"
                            value={courseData.price}
                            onChange={handleInputChange}
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Description"
                            name="description"
                            value={courseData.description}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rows={4}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button variant="outlined" onClick={handleUpdate}>
                            Update
                          </Button>
                        </Grid>
                      </Grid>
                      <Typography variant="h5" component="div">
                        {courseData?.name}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {courseData?.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Price:{" "}
                        {courseData?.price === 0
                          ? "Free"
                          : `$${courseData?.price}`}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Published on {courseData?.publishDate}
                      </Typography>
                    </CardContent>
                  </Card>
                </>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default CourseUpdatePage;
