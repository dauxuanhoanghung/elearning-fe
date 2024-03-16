import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import firebaseService from "@/app/firebase/firebaseService";
import { changeChatUser } from "@/app/store/chatSlice";
import CommentContainer from "@/components/CommentContainer";
import {
  FavoriteFullIcon,
  FavoriteIcon,
  InfiniteIcon,
  MobileIcon,
  MultiUsersIcon,
  TickIcon,
  VideoIcon,
} from "@/components/Icons/index";
import SectionCard from "@/components/SectionCard";
import { useOpenChatDrawer } from "@/contexts/OpenChatDrawerContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import {
  courseCommentService,
  courseService,
  registrationService,
} from "@/services";
import { isEmptyObject } from "@/utils/utils";
import Avatar from "@/components/ui/Avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
    console.log("course details:", res);

    if (res.data.length > 0) {
      setComments([...comments, ...res.data]);
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
        <h1 className="mb-3 text-xl font-bold">{t("detail.courseInclude")}</h1>
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
    <main className="w-full" data-page="course-details">
      <img
        src={
          courseData.background ||
          "https://i.ytimg.com/vi/7PCkvCPvDXk/hqdefault.jpg"
        }
        className="max-h-[60vh] w-full object-cover"
      />
      {/* Content */}
      <div
        className="container text-gray-900 dark:text-gray-50"
        data-role="course-detail-content"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
          <div className="col-span-12 py-2 sm:col-span-8">
            <Breadcrumb>
              <BreadcrumbList className="text-lg">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{courseData.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className="py-3 text-5xl">{courseData.name}</p>
            <p className="py-3 text-lg">{courseData.description}</p>
            <div data-role="course-detail-criteria-content">
              <p className="py-2 text-4xl">Criteria:</p>
              <div className="pl-4 lg:pl-8">
                {listCriteria?.map((criteria, index) => (
                  <div className="flex items-center gap-2 py-1" key={index}>
                    <TickIcon className="text-gray-900 dark:text-gray-50" />
                    <span className="text-lg">{criteria.text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Course Sections */}
            <div data-role="course-detail-section-content">
              <p className="py-2 text-4xl">Sections:</p>
              {sections?.map((section, index) => (
                <React.Fragment key={index}>
                  <SectionCard
                    orderIndex={section.orderIndex}
                    sectionName={section.sectionName}
                    hideExpand={true}
                  />
                </React.Fragment>
              ))}
            </div>
            <CommentContainer
              courseId={courseId}
              comments={comments}
              setComments={setComments}
              getMoreComments={getCommentsByCourseId}
            />
          </div>
          <div className="col-span-12 sm:col-span-4">
            <div className="w-full bg-gray-200 p-6 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              <h1 className="mb-3 text-4xl">{courseData.price} VNĐ</h1>
              <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                  <button
                    className="w-4/5 bg-gray-700 p-3 font-semibold text-gray-50 transition-all
                   dark:bg-white dark:text-gray-800 hover:dark:bg-gray-200"
                    onClick={() => {}}
                  >
                    {t("detail.addToCart")}
                  </button>
                  <button
                    className="flex w-1/5 justify-center border border-solid border-white p-3 font-semibold 
                    transition-all dark:border-white dark:text-white dark:hover:bg-gray-500"
                    onClick={() => {}}
                  >
                    <FavoriteIcon className="h-6 w-6" />
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
                    {registration
                      ? t("detail.watchContinue")
                      : t("detail.buyNow")}
                  </button>
                </div>
                <IncludeFeature />
              </div>
            </div>
            <div className="my-2 w-full bg-gray-200 px-6 py-2 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              <div className="flex items-center">
                <Avatar
                  src={courseData.user?.avatar}
                  alt={`${courseData.user?.lastName} ${courseData.user?.firstName}`}
                />
                <p className="mx-auto text-base">
                  {`${courseData.user?.firstName} ${courseData.user?.lastName}`}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {t("detail.createdDate")} {courseData.createdDate}
              </p>
              {courseData.user?.id === currentUser.id && (
                <button
                  onClick={handleEditCourse}
                  className="mt-2 w-full border border-solid p-3 font-semibold transition-all dark:border-white
                  dark:text-white dark:hover:bg-gray-500"
                >
                  {t("detail.editCourse")}
                </button>
              )}
              {!isEmptyObject(currentUser) &&
                courseData?.user?.id !== currentUser.id && (
                  <button
                    onClick={handleChatToCreator}
                    className="mt-2 w-full border border-solid p-3 font-semibold transition-all dark:border-white
                  dark:text-white dark:hover:bg-gray-500"
                  >
                    {t("detail.chatCreator")}
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="container" data-role="detail-related-section"></div>
    </main>
  );
};

export default CourseDetailPage;
