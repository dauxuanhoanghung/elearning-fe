import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import LectureList from "@/components/LectureList";
import Avatar from "@/components/ui/Avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useOpenChatDrawer } from "@/contexts/OpenChatDrawerContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import {
  courseCommentService,
  courseService,
  registrationService,
} from "@/services";
import favoriteService from "@/services/favorite.service";
import { isEmptyObject } from "@/utils/utils";

const CourseDetailPage = (props) => {
  const { t } = useTranslation();
  const { handleOpenChatDrawer } = useOpenChatDrawer();
  const { courseId } = useParams();
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // #region course detail
  /**
   * course {id, name, description, background(image), price(for button), creator, createdDate}
   */
  const {
    data: countLectures,
    isLoading: countLecturesLoading,
    isError: countLecturesError,
  } = useQuery({
    queryKey: ["countLectures", courseId],
    queryFn: async () => {
      const res = await courseService.countLecturesByCourseId(courseId);
      return res.data;
    },
    initialData: 0,
  });

  const {
    data: courseData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const res = await courseService.getById(courseId);
      if (res.data) {
        return res.data;
      } else {
        showSnackbar({ message: "Course not found!!!", severity: "error" });
        navigate("/");
        throw new Error("Course not found");
      }
    },
    initialData: {
      id: "",
      name: "",
      description: "",
      background: "",
      price: "",
      creator: "",
      createdDate: "",
      countLectures: 0,
      countRegistrations: 0,
    },
  });
  // #endregion
  // #region wishlist
  const {
    data: isWishlisted,
    isLoading: isWishlistedLoading,
    isError: isWishlistedError,
  } = useQuery({
    queryKey: ["isWishlisted", { courseId, userId: currentUser.id }],
    queryFn: async () => {
      const res = await favoriteService.fetchInitialFavorite(courseId);
      return res.data;
    },
    initialData: false,
  });
  const toggleWishlist = useMutation({
    mutationFn: async (isWishlisted) => {
      const res = await favoriteService.toggle({ course: courseId });
      if (res.status === 201 || res.status === 204)
        showSnackbar({
          severity: "success",
          message: isWishlisted
            ? "Remove from wishlist success!!!"
            : "Add to wishlist success!!!",
        });
      return res.data;
    },
    onMutate: async (isWishlisted) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries([
        "isWishlisted",
        { courseId, userId: currentUser.id },
      ]);
      // Snapshot the previous value
      const previousIsWishlisted = queryClient.getQueryData([
        "isWishlisted",
        { courseId, userId: currentUser.id },
      ]);
      // Optimistically update the cache with the new value
      queryClient.setQueryData(
        ["isWishlisted", { courseId, userId: currentUser.id }],
        !isWishlisted,
      );
      // Return a context object with the snapshotted value
      return { previousIsWishlisted };
    },
    onError: (err, newIsWishlisted, context) => {
      // Roll back the optimistic update on error
      queryClient.setQueryData(
        ["isWishlisted", { courseId, userId: currentUser.id }],
        context.previousIsWishlisted,
      );
    },
  });

  const handleToggleWishlist = async () => {
    toggleWishlist.mutate(isWishlisted);
  };
  // #endregion

  // #region criteria
  const { data: listCriteria } = useQuery({
    queryKey: ["criteria", { courseId }],
    queryFn: async () => {
      const res = await courseService.getCriteriaByCourseId(courseId);
      if (res.status === 200) return res.data;
      return [];
    },
    initialData: [],
    staleTime: 60000,
  });

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
  const [url, setUrl] = useState("");
  const {
    data: registration,
    isLoading: registrationLoading,
    isError: registrationError,
  } = useQuery({
    queryKey: ["registration", { id: courseId }],
    queryFn: async () => {
      const res = await registrationService.getInitialRegistration(courseId);
      console.log("getInitialRegistration", res);
      if (res.data) {
        setUrl(`/course/${courseId}/learning?lectureId=${res.data.nextUrl}`);
      } else {
        setUrl(`/payment/${courseId}/make`);
      }
      return Boolean(res.data.transaction);
    },
    initialData: false,
  });

  const handleSeeContinue = () => {
    // Nav to the first lecture
    console.log("handleSeeContinue", url);
    navigate(url);
  };

  const handleRegisterCourse = async () => {
    if (registration) return;
    // if user doesn't login, navigate to LOGIN page
    if (isEmptyObject(currentUser)) {
      showSnackbar({
        message: "Please login first to use this Buy now feature.",
        severity: "error",
      });
      navigate("/login");
      return;
    }
    /**
     * POST to register, if fee > 0, status = 200, else status = 201
     * @var {status, message, data} res
     */
    const res = await registrationService.register({ course: courseId });
    if (res.status === 201) {
      showSnackbar({
        message: "Register course success!!!",
        severity: "success",
      });
      navigate(`/course/${courseId}/learning?lectureId=${res?.data.nextUrl}`);
    } else if (res.status === 200) navigate(`/payment/${courseId}/`);
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
  // #region Lecturer
  const handleEditCourse = () => {
    navigate(`/course/${courseId}/update`);
  };
  // #endregion

  const IncludeFeature = (props) => {
    const { className } = props;
    const features = [
      {
        icon: MultiUsersIcon,
        text: `${courseData.countRegistration} ${t("detail.registrations")}`,
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

  if (isLoading || countLecturesLoading) return <div>Loading...</div>;
  if (isError || countLecturesError) return <div>Error...</div>;

  return (
    <main className="w-full" data-page="course-details">
      <img
        src={courseData.background}
        alt={courseData.name}
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
                  <div className="flex items-start gap-2 py-1" key={index}>
                    <div className="">
                      <TickIcon className="text-gray-900 dark:text-gray-50" />
                    </div>
                    <span className="text-lg">{criteria.text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Course Sections */}
            <div data-role="course-detail-section-content">
              <LectureList isCourseDetailPage={true} />
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
              {!registration && (
                <h1 className="mb-3 text-4xl">${courseData.price} USD</h1>
              )}
              <div className="flex flex-col gap-3">
                {registrationLoading ? (
                  <Loader />
                ) : (
                  <React.Fragment>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        className="flex w-full justify-center gap-3 border border-solid border-white p-3 font-semibold 
                                  transition-all dark:border-white dark:text-white dark:hover:bg-gray-500"
                        onClick={handleToggleWishlist}
                      >
                        {isWishlisted ? (
                          <>
                            <FavoriteFullIcon className="h-6 w-6" />
                            <span>Remove from wishlist</span>
                          </>
                        ) : (
                          <>
                            <FavoriteIcon className="h-6 w-6" />
                            <span>Add to wishlist</span>
                          </>
                        )}
                      </button>
                    </div>
                  </React.Fragment>
                )}
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
            <article
              className="w-full bg-gray-200 px-6 py-2 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              data-role="action-section"
            >
              <button
                onClick={() => {}}
                className="mt-2 w-1/2 border border-solid p-3 font-semibold transition-all dark:border-white
                  dark:text-white dark:hover:bg-gray-500"
              >
                Gift course
              </button>
              <button
                onClick={() => {}}
                className="mt-2 w-1/2 border border-solid p-3 font-semibold transition-all dark:border-white
                  dark:text-white dark:hover:bg-gray-500"
              >
                Apply coupon
              </button>
            </article>
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
