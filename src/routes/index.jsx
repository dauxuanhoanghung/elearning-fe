import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAdmin, isEmptyObject, isLecturer } from "../utils/utils";
import Home from "../pages/home";
import Login from "../pages/login";
import PageNotFound from "../pages/errors/notFound";
import Signup from "../pages/signup";
import CourseCreationPage from "../pages/admin/course/create";
import CourseDetail from "../pages/client/courseDetail";
import LectureDetail from "../pages/client/lectureDetail";
import FavoritePage from "../pages/client/favorite";
import MyCoursePage from "../pages/client/myCourse";
import MyBusinessPage from "../pages/client/myBusiness";
import RegisterLecturerPage from "../pages/client/registerLecturer";
import AdminHomePage from "../pages/admin/home";
import AdminStatsPage from "../pages/admin/stats";
import AdminApprovalPage from "../pages/admin/approval";
import CourseUpdatePage from "../pages/admin/course/update";
import { useSelector } from "react-redux";
import { useSnackbar } from "../contexts/SnackbarContext";
import ProfilePage from "../pages/profile";
import PaymentPage from "../pages/payment";


const AuthenticatedRoute = ({ redirect = "/login" }) => {
  const currentUser = useSelector(state => state.user.user);
  const { state } = useLocation();
  if (currentUser && !isEmptyObject(currentUser))
    return <Outlet />;
  const { showSnackbar } = useSnackbar();
  showSnackbar({ message: "You must login to access this page!!!", severity: "error" });
  return <Navigate to={state?.redirect || redirect} />;

};

const LecturerRoute = ({ redirect = "/" }) => {
  const currentUser = useSelector(state => state.user.user);
  const { state } = useLocation();
  console.log(currentUser)
  if (currentUser !== null && isLecturer(currentUser))
    return <Outlet />;
  const { showSnackbar } = useSnackbar();
  showSnackbar({ message: "You must be a lecturer to access this page!!!", severity: "error" });
  return <Navigate to={state?.redirect || redirect} />;
};

const AdminRoute = ({ redirect = "/" }) => {
  const currentUser = useSelector(state => state.user.user);
  const { state } = useLocation();
  if (currentUser !== null && isAdmin(currentUser))
    return <Outlet />;
  const { showSnackbar } = useSnackbar();
  showSnackbar({ message: "You don't have permission to access this page!!!", severity: "error" });
  return <Navigate to={state?.redirect || redirect} />;
}

const AnonymousRoute = ({ redirect = "/" }) => {
  const currentUser = useSelector(state => state.user.user);
  const { state } = useLocation();
  if (!currentUser || isEmptyObject(currentUser))
    return <Outlet />;
  const { showSnackbar } = useSnackbar();
  showSnackbar({ message: "You have already login, can access this page!!!", severity: "error" });
  return <Navigate to={state?.redirect || redirect} />;
}

export const routers = [
  { path: "/", element: <Home /> },
  { path: "login", element: <AnonymousRoute />, children: [{ index: true, element: <Login /> }] },
  { path: "signup", element: <AnonymousRoute />, children: [{ index: true, element: <Signup /> }] },
  { path: "my-profile", element: <AuthenticatedRoute />, children: [{ index: true, element: <ProfilePage /> }] },
  { path: "/payment/:courseId", element: <AuthenticatedRoute />, children: [{ index: true, element: <PaymentPage /> }] },
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
      { path: ":courseId/update", element: <CourseUpdatePage />, exactly: true },
      { path: ":courseId/learning", element: <LectureDetail />, exactly: true },
      { path: ":courseId/view", element: <CourseDetail />, exactly: true },
      { index: true, element: <Navigate to="/" /> }
    ]
  },
  {
    path: "/admin",
    element: <AdminRoute />,
    children: [
      { index: true, element: <AdminHomePage /> },
      { path: "stats", element: <AdminStatsPage /> },
      { path: "approval", element: <AdminApprovalPage /> }
    ]
  },
  { path: "*", element: <PageNotFound /> },
];
