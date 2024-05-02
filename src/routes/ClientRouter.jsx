import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSnackbar } from "@/contexts/SnackbarContext";
import DefaultLayout from "@/layout/DefaultLayout";
import CourseCreationPage from "@/pages/admin/course/create";
import CourseUpdatePage from "@/pages/admin/course/update";
import { ForgotPasswordPage, LoginPage, SignupPage } from "@/pages/auth";
import BlogsPage from "@/pages/client/blog";
import BlogDetailsPage from "@/pages/client/blog/blog-detail";
import CourseDetailPage from "@/pages/client/course-detail";
import LectureDetailPage from "@/pages/client/lecture-detail";
import MyBusinessPage from "@/pages/client/my-business";
import {
  MyCourseLayout,
  MyCoursePage,
  MyWishlistPage,
} from "@/pages/client/my-course";
import RegisterLecturerPage from "@/pages/client/register-lecturer";
import SearchCoursePage from "@/pages/client/search";
import { InstructorProfilePage } from "@/pages/client/user";
import HomePage from "@/pages/home";
import FAQPage from "@/pages/marketing/faq";
import {
  CheckoutPage,
  PayPalCapturePage,
  ResultPaymentPage,
} from "@/pages/payment";
import {
  DeleteAccountPage,
  EditPasswordPage,
  ProfilePage,
  SettingsPage,
} from "@/pages/profile";
import { isEmptyObject, isLecturer } from "@/utils/utils";

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
        path: "search",
        element: <SearchCoursePage />,
      },
      {
        path: "user",
        children: [
          {
            path: ":username",
            element: <InstructorProfilePage />,
          },
        ],
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
      {
        path: "user",
        children: [
          {
            path: ":userId",
            element: null,
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
      { path: "edit-password", element: <EditPasswordPage /> },
      { path: "delete-account", element: <DeleteAccountPage /> },
      {
        path: "my-course",
        element: <MyCourseLayout />,
        children: [
          {
            index: true,
            element: <MyCoursePage />,
          },
          {
            path: "wishlist",
            element: <MyWishlistPage />,
          },
        ],
      },
      { path: "register-lecturer", element: <RegisterLecturerPage /> },
      { path: "my-business", element: <MyBusinessPage /> },
      { path: "payment/:courseId", element: <CheckoutPage /> },
      { path: "payment/result", element: <ResultPaymentPage /> },
      { path: "payment/paypal/capture", element: <PayPalCapturePage /> },
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
  {
    path: "/",
    element: <DefaultLayout />,
    children: [{ path: "faq", element: <FAQPage /> }],
  },
];

export default ClientRouter;
