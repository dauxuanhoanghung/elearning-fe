import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import SectionCard from "../../../components/SectionCard";
import CommentContainer from "../../../components/CommentContainer";
import {
  courseCommentService,
  courseService,
  registrationService,
} from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { isEmptyObject } from "../../../utils/utils";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import DefaultLayout from "../../../layout";
import firebaseService from "../../../app/firebase/firebaseService";
import { changeChatUser } from "../../../app/store/user/chatSlice";
import { useOpenChatDrawer } from "../../../contexts/OpenChatDrawerContext";

function CourseDetail(props) {
  const { handleOpenChatDrawer } = useOpenChatDrawer();
  const { courseId } = useParams();
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // #region course detail
  /**
   * course {id, name, description, background(image), price(for button), creator, createdDate}
   */
  const [courseData, setCourseData] = useState({});
  const [countLectures, setCountLectures] = useState(0);
  const [countRegistrations, setCountRegistrations] = useState(0);
  useEffect(() => {
    const getCountLecturesByCourseId = async (courseId) => {
      const res = await courseService.countLecturesByCourseId(courseId);
      setCountLectures(res.data.data);
    };
    const getCountRegistrationsByCourseId = async (courseId) => {
      const res = await courseService.countRegistrationsByCourseId(courseId);
      setCountRegistrations(res.data.data);
    };
    const getCourseByCourseId = async (courseId) => {
      const res = await courseService.getCourseById(courseId);
      if (res.data.data) {
        setCourseData(res.data.data);
        getCountLecturesByCourseId(courseId);
        getCountRegistrationsByCourseId(courseId);
      }
      else {
        showSnackbar({ message: "Course not found!!!", severity: "error" });
        navigate("/");
      }
    };
    getCourseByCourseId(courseId);
  }, [courseId]);
  // #endregion
  // #region criteria
  const [listCriteria, setListCriteria] = useState([]);
  useEffect(() => {
    const getListCriteriaByCourseId = async (courseId) => {
      const res = await courseService.getCriteriaByCourseId(courseId);
      setListCriteria([...res.data.data]);
    };
    getListCriteriaByCourseId(courseId);
  }, []);
  // #endregion
  // #region section
  const [sections, setSections] = useState([]);
  useEffect(() => {
    const getSectionsByCourseId = async (courseId) => {
      const res = await courseService.getSection(courseId);
      setSections([...res.data.data]);
    };
    getSectionsByCourseId(courseId);
  }, []);
  // #endregion
  // #region comments
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const getCommentsByCourseId = async () => {
    if (page === -1) return;
    let res = await courseCommentService.getCommentsByCourseId(courseId, page);
    if (res.data.data.length > 0) {
      setComments([...comments, ...res.data.data]);
      setPage(page + 1);
    } else setPage(-1);
  };
  useEffect(() => {
    getCommentsByCourseId(courseId);
  }, []);
  // #endregion
  // #region Registration
  const [registration, setRegistration] = useState(false);
  const [url, setUrl] = useState("");
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current && !registration && !isEmptyObject(currentUser)) {
      console.log("init")
      firstRender.current = false;
      const getInitialRegistration = async () => {
        const res = await registrationService.getInitialRegistration(courseId);
        console.log(res)
        const data = res.data;
        if (data?.status === 200) {
          if (data?.data?.transaction) {
            setRegistration(true);
            setUrl(`/course/${courseId}/learning?lectureId=${data?.data.nextUrl}`)
          }
          else {
            setUrl(`/payment/${courseId}/make`);
          }
        }

      };
      getInitialRegistration();
    }
  }, []);
  const handleSeeContinue = () => {
    // Nav to the first lecture
    console.log("handleSeeContinue", url)
    navigate(url);
  }
  const handleRegisterCourse = async () => {
    if (registration) return;
    if (isEmptyObject(currentUser)) {
      showSnackbar({
        message: "Please login first to use to feature.",
        severity: "error",
      });
      navigate("/login");
      return;
    }
    // Post course registration
    const res = await registrationService.register({ course: courseId });
    console.log(res);
    // Ko phí, code === 201
    if (res.data.status === 201) {
      showSnackbar({ message: "Register course success!!!", severity: "success" })
      // Nav to the first lecture
      navigate(`/course/${courseId}/learning?lectureId=${res?.data?.data.nextUrl}`);
    }
    // nếu có tiền thì phải code === 200
    else if (res.data.status === 200) {
      navigate(`/payment/${courseId}/`);
    }
  };
  // #endregion
  // #region Chat
  const handleChatToCreator = async () => {
    const res = await firebaseService.getUserById(courseData?.user.id);
    console.log(res);
    if (res) {
      dispatch(changeChatUser({ ...res, createdAt: res.createdAt.toDate().toString() }))
    }
    handleOpenChatDrawer();
  }
  // #endregion
  const handleEditCourse = () => {
    navigate(`/course/${courseId}/update`);
  }

  return (
    <>
      <DefaultLayout>
        <CardMedia
          component="img"
          height="400"
          image={
            courseData.background ||
            "https://i.ytimg.com/vi/7PCkvCPvDXk/hqdefault.jpg"
          }
          alt="green iguana"
        />
        {/* Content */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link to="/" style={{ textDecoration: "none" }}>
                Home
              </Link>
              <Typography color="textPrimary">{courseData.name}</Typography>
            </Breadcrumbs>
            {/* Course Title */}
            <Typography variant="h4" gutterBottom>
              {courseData.name}
            </Typography>
            {/* Course Description */}
            <Typography variant="h6" gutterBottom>
              {courseData.description}
            </Typography>
            {/* Course Sections */}
            <Typography variant="h5" gutterBottom>
              <Typography variant="h5">Criteria:</Typography>
              {listCriteria?.map((criteria, index) => (
                <React.Fragment key={index}>
                  <Typography variant="body1">
                    <ArrowForwardIosRoundedIcon style={{ fontSize: "14px" }} />{" "}
                    {criteria.text}
                  </Typography>
                </React.Fragment>
              ))}
            </Typography>
            {/* Course Sections */}
            <Typography variant="subtitle1" gutterBottom>
              <Typography variant="h5">Course sections:</Typography>
              {sections?.map((section, index) => (
                <React.Fragment key={index}>
                  <SectionCard
                    orderIndex={section.orderIndex}
                    sectionName={section.sectionName}
                    hideExpand={true}
                  />
                </React.Fragment>
              ))}
            </Typography>

            {/* Render comments section here */}
            <CommentContainer
              courseId={courseId}
              comments={comments}
              setComments={setComments}
              getMoreComments={getCommentsByCourseId}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography sx={{ alignItems: "center" }}>
                    <GroupAddOutlinedIcon />
                    <span style={{ marginBottom: "5px" }}>Registrations: </span>
                  </Typography>
                  <Typography>{countRegistrations || 0}</Typography>
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography>
                    <FeedOutlinedIcon />
                    Lectures:
                  </Typography>
                  <Typography>{countLectures || 0}</Typography>
                </Typography>
              </CardContent>
            </Card>
            {registration && (
              <Button
                variant="contained"
                sx={{ width: "100%", backgroundColor: "#f1c40f" }}
                onClick={handleSeeContinue}
              >
                Continue see course
              </Button>
            )}
            {!registration && (
              <Button
                variant="contained"
                sx={{ width: "100%", backgroundColor: "#3498db" }}
                onClick={handleRegisterCourse}
              >
                {courseData?.price === 0
                  ? "Free. Register now"
                  : `Register by ${courseData?.price}`}
              </Button>
            )}
            {/* Creator */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "10px auto",
              }}
            >
              <Avatar
                src={courseData.user?.avatar}
                alt={`${courseData.user?.firstName} ${courseData.user?.lastName}`}
                style={{ marginRight: "16px" }}
              />
              <Typography variant="body1">
                {`${courseData.user?.firstName} ${courseData.user?.lastName}`}
              </Typography>

            </Box>
            {/* Created Date */}
            <Typography variant="body2" color="textSecondary">
              Created Date: {courseData.createdDate}
            </Typography>
            {courseData.user?.id === currentUser.id && <>
              <Button onClick={handleEditCourse}>Edit your course</Button>
            </>}
            {!isEmptyObject(currentUser) && courseData?.user?.id !== currentUser.id && <>
              <Button onClick={handleChatToCreator}>Chat to creator</Button>
            </>}
          </Grid>
        </Grid>
      </DefaultLayout>
    </>
  );
}

export default CourseDetail;
