import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import ChatContainer from "@/components/Chat/ChatContainer";
import { useSnackbar } from "@/contexts/SnackbarContext";
import AdminLayout from "@/layout/AdminLayout";
import DefaultLayout from "@/layout/DefaultLayout";
import { AdminHomePage } from "@/pages/admin/index";
import { LoginPage, SignupPage } from "@/pages/auth";
import { NotFoundPage } from "@/pages/errors";
import CourseCreationPage from "../pages/admin/course/create";
import CourseUpdatePage from "../pages/admin/course/update";
import CourseDetail from "../pages/client/courseDetail";
import FavoritePage from "../pages/client/favorite";
import LectureDetail from "../pages/client/lectureDetail";
import MyBusinessPage from "../pages/client/myBusiness";
import MyCoursePage from "../pages/client/myCourse";
import RegisterLecturerPage from "../pages/client/registerLecturer";
import Home from "../pages/home";
import PaymentPage from "../pages/payment";
import ResultPaymentPage from "../pages/payment/result";
import ProfilePage from "../pages/profile";
import { isEmptyObject, isLecturer } from "../utils/utils";

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

export const routers = [
  { path: "/", element: <Home /> },
  {
    path: "login",
    element: <AnonymousRoute />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: "signup",
    element: <AnonymousRoute />,
    children: [{ index: true, element: <SignupPage /> }],
  },
  {
    path: "my-profile",
    element: <AuthenticatedRoute />,
    children: [{ index: true, element: <ProfilePage /> }],
  },
  {
    path: "/payment/:courseId",
    element: <AuthenticatedRoute />,
    children: [{ index: true, element: <PaymentPage /> }],
  },
  { path: "/payment/result", element: <ResultPaymentPage /> },
  { path: "/blog/:blogId", element: null },
  {
    path: "/my-favorite",
    element: <AuthenticatedRoute />,
    children: [{ index: true, element: <FavoritePage /> }],
  },
  {
    path: "/my-course",
    element: <AuthenticatedRoute />,
    children: [{ index: true, element: <MyCoursePage /> }],
  },
  {
    path: "/register-lecturer",
    element: <AuthenticatedRoute />,
    children: [{ index: true, element: <RegisterLecturerPage /> }],
  },
  {
    path: "/my-business",
    element: <LecturerRoute />,
    children: [{ index: true, element: <MyBusinessPage /> }],
  },
  {
    path: "/course",
    element: <LecturerRoute />,
    children: [
      { path: "create", element: <CourseCreationPage />, exactly: true },
      {
        path: ":courseId/update",
        element: <CourseUpdatePage />,
        exactly: true,
      },
      { index: true, element: <Navigate to="/" /> },
    ],
  },
  {
    path: "/course/:courseId/learning",
    element: <AuthenticatedRoute />,
    children: [{ index: true, element: <LectureDetail /> }],
  },
  {
    path: "/course/:courseId/view",
    element: <CourseDetail />,
  },
  {
    path: "/test",
    element: (
      <DefaultLayout>
        <div className="w-full dark:bg-gray-700">
          <ChatContainer />
        </div>
      </DefaultLayout>
    ),
  },
  {
    path: "/auth",
    element: <AdminLayout />,
    children: [{ index: true, element: <AdminHomePage /> }],
  },
  { path: "*", element: <NotFoundPage /> },
];
