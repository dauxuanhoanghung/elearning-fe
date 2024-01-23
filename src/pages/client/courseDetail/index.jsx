import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Typography,
} from "@mui/material";

import firebaseService from "@/app/firebase/firebaseService";
import { changeChatUser } from "@/app/store/chatSlice";
import CommentContainer from "@/components/CommentContainer";
import {
  FavoriteFullIcon,
  FavoriteIcon,
  InfiniteIcon,
  MobileIcon,
  MultiUsersIcon,
  VideoIcon,
} from "@/components/Icons/index";
import SectionCard from "@/components/SectionCard";
import { useOpenChatDrawer } from "@/contexts/OpenChatDrawerContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import DefaultLayout from "@/layout";
import {
  courseCommentService,
  courseService,
  registrationService,
} from "@/services";
import { isEmptyObject } from "@/utils/utils";

const CourseDetailPage = (props) => {
  const { t } = useTranslation();
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
      setCountLectures(res.data);
    };
    const getCountRegistrationsByCourseId = async (courseId) => {
      const res = await courseService.countRegistrationsByCourseId(courseId);
      setCountRegistrations(res.data);
    };
    const getCourseByCourseId = async (courseId) => {
      const res = await courseService.getCourseById(courseId);
      if (res.data) {
        setCourseData(res.data);
        getCountLecturesByCourseId(courseId);
        getCountRegistrationsByCourseId(courseId);
      } else {
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
      setListCriteria([...res.data]);
    };
    getListCriteriaByCourseId(courseId);
  }, []);
  // #endregion
  // #region section
  const [sections, setSections] = useState([]);
  useEffect(() => {
    const getSectionsByCourseId = async (courseId) => {
      const res = await courseService.getSection(courseId);
      setSections([...res.data]);
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
      console.log("init");
      firstRender.current = false;
      const getInitialRegistration = async () => {
        const res = await registrationService.getInitialRegistration(courseId);
        console.log(res);
        const data = res.data;
        if (data?.status === 200) {
          if (data?.data?.transaction) {
            setRegistration(true);
            setUrl(
              `/course/${courseId}/learning?lectureId=${data?.data.nextUrl}`,
            );
          } else {
            setUrl(`/payment/${courseId}/make`);
          }
        }
      };
      getInitialRegistration();
    }
  }, []);
  const handleSeeContinue = () => {
    // Nav to the first lecture
    console.log("handleSeeContinue", url);
    navigate(url);
  };
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
      showSnackbar({
        message: "Register course success!!!",
        severity: "success",
      });
      // Nav to the first lecture
      navigate(
        `/course/${courseId}/learning?lectureId=${res?.data?.data.nextUrl}`,
      );
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
      dispatch(
        changeChatUser({
          ...res,
          createdAt: res.createdAt.toDate().toString(),
        }),
      );
    }
    handleOpenChatDrawer();
  };
  // #endregion
  const handleEditCourse = () => {
    navigate(`/course/${courseId}/update`);
  };

  const IncludeFeature = (props) => {
    const { className } = props;
    const features = [
      {
        icon: MultiUsersIcon,
        text: `${countRegistrations} ${t("detail.registrations")}`,
      },
      { icon: VideoIcon, text: `${countLectures} ${t("detail.lectures")}` },
      { icon: MobileIcon, text: t("detail.access") },
      { icon: InfiniteIcon, text: t("detail.time") },
    ];
    return (
      <div className={twMerge("w-full", className)}>
        <h1 className="mb-3 text-xl font-bold">This course includes:</h1>
        <div className="flex flex-col gap-2">
          {features.map((f, idx) => (
            <h2 key={idx} className="flex items-center gap-3">
              <f.icon />
              <span className="ml-4 text-lg">{f.text}</span>
            </h2>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <DefaultLayout>
        <img
          src={
            courseData.background ||
            "https://i.ytimg.com/vi/7PCkvCPvDXk/hqdefault.jpg"
          }
          className="max-h-[60vh] w-full object-cover"
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
            <div className="w-full bg-gray-200 p-6 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              <h1 className="mb-3 text-4xl">{courseData.price} VNĐ</h1>
              <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                  <button
                    className="w-4/5 bg-gray-700 p-3 font-semibold text-gray-50 transition-all
                   dark:bg-white dark:text-gray-800 hover:dark:bg-gray-200"
                    onClick={() => {}}
                  >
                    Add to cart
                  </button>
                  <button
                    className="flex w-1/5 justify-center border border-solid border-white p-3 font-semibold 
                    transition-all dark:border-white dark:text-white dark:hover:bg-gray-500"
                    onClick={() => {}}
                  >
                    <FavoriteIcon className="h-6 w-6" />
                    <FavoriteFullIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex w-full gap-4">
                  <button
                    className="w-full border border-solid p-3 font-semibold transition-all dark:border-white
                   dark:text-white dark:hover:bg-gray-500"
                    onClick={
                      registration ? handleSeeContinue : handleRegisterCourse
                    }
                  >
                    {registration ? t("Watch continue") : t("Buy now")}
                  </button>
                </div>
                <IncludeFeature />
              </div>
            </div>
          </Grid>
        </Grid>
      </DefaultLayout>
    </>
  );
};

export default CourseDetailPage;

const Old = () => (
  <>
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
    {courseData.user?.id === currentUser.id && (
      <>
        <Button onClick={handleEditCourse}>Edit your course</Button>
      </>
    )}
    {!isEmptyObject(currentUser) && courseData?.user?.id !== currentUser.id && (
      <>
        <Button onClick={handleChatToCreator}>Chat to creator</Button>
      </>
    )}
  </>
);
