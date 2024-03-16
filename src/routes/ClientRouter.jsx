import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSnackbar } from "@/contexts/SnackbarContext";
import DefaultLayout from "@/layout/DefaultLayout";
import CourseCreationPage from "@/pages/admin/course/create";
import CourseUpdatePage from "@/pages/admin/course/update";
import { ForgotPasswordPage, LoginPage, SignupPage } from "@/pages/auth";
import CourseDetailPage from "@/pages/client/course-detail";
import FavoritePage from "@/pages/client/favorite";
import MyBusinessPage from "@/pages/client/my-business";
import MyCoursePage from "@/pages/client/myCourse";
import RegisterLecturerPage from "@/pages/client/register-lecturer";
import HomePage from "@/pages/home";
import PaymentPage from "@/pages/payment";
import ResultPaymentPage from "@/pages/payment/result";
import { ProfilePage, SettingsPage } from "@/pages/profile";
import { isEmptyObject, isLecturer } from "@/utils/utils";
import LectureDetailPage from "@/pages/client/lecture-detail";
import BlogsPage from "@/pages/client/blog";
import BlogDetailsPage from "@/pages/client/blog/blog-detail";

const AnonymousRoute = ({ redirect = "/" }) => {
  const { user: currentUser, isLogin } = useSelector((state) => state.user);
  const { state } = useLocation();
  if (isEmptyObject(currentUser)) return <Outlet />;
  const { showSnackbar } = useSnackbar();
  console.warn("routes | index.AnonymousRoute");
  showSnackbar({
    message: "You have already login, can access this page!!!",
    severity: "error",
  });
  return <Navigate to={state?.redirect || redirect} />;
};

const AuthenticatedRoute = ({ redirect = "/login" }) => {
  const currentUser = useSelector((state) => state.user.user);
  const { state } = useLocation();
  if (currentUser && !isEmptyObject(currentUser)) return <Outlet />;
  console.log("routes.AuthenticatedRoute after");
  const { showSnackbar } = useSnackbar();
  showSnackbar({
    message: "You must login to access this page!!!",
    severity: "error",
  });
  return <Navigate to={state?.redirect || redirect} />;
};

const LecturerRoute = ({ redirect = "/" }) => {
  const currentUser = useSelector((state) => state.user.user);
  const { state } = useLocation();
  console.log(currentUser);
  if (
    currentUser !== null &&
    !isEmptyObject(currentUser) &&
    isLecturer(currentUser)
  )
    return <Outlet />;
  const { showSnackbar } = useSnackbar();
  showSnackbar({
    message: "You must be a lecturer to access this page!!!",
    severity: "error",
  });
  return <Navigate to={state?.redirect || redirect} />;
};

const ClientRouter = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "blog",
        children: [
          { index: true, element: <BlogsPage /> },
          { path: "post", element: <AuthenticatedRoute></AuthenticatedRoute> },
          { path: ":slug", element: <BlogDetailsPage /> },
        ],
      },
      {
        path: "course",
        children: [
          { path: ":courseId/view", element: <CourseDetailPage /> },
          {
            path: ":courseId/learning",
            element: <AuthenticatedRoute />,
            children: [{ index: true, element: <LectureDetailPage /> }],
          },
          {
            path: "*",
            element: <LecturerRoute />,
            children: [
              {
                path: "create",
                element: <CourseCreationPage />,
                exactly: true,
              },
              {
                path: ":courseId/update",
                element: <CourseUpdatePage />,
                exactly: true,
              },
              { index: true, element: <Navigate to="/" /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: (
      <DefaultLayout>
        <AuthenticatedRoute />
      </DefaultLayout>
    ),
    children: [
      { path: "profile", element: <ProfilePage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "my-favorite", element: <FavoritePage /> },
      { path: "my-course", element: <MyCoursePage /> },
      { path: "register-lecturer", element: <RegisterLecturerPage /> },
      { path: "my-business", element: <MyBusinessPage /> },
      { path: "payment/:courseId", element: <PaymentPage /> },
      { path: "payment/result", element: <ResultPaymentPage /> },
    ],
  },
  {
    path: "/",
    element: <AnonymousRoute />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
];

export default ClientRouter;
