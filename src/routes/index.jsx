import { getProfileFromLS } from "../utils/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isEmptyObject, isLecturer } from "../utils/utils";
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

const AuthenticatedRoute = ({ redirect = "/" }) => {
  const user = getProfileFromLS();
  const { state } = useLocation();
  if (user === null || isEmptyObject(user))
    return <Navigate to={state?.redirect || redirect} />;
  return <Outlet />;
};

const LecturerRoute = ({ redirect = "/" }) => {
  const user = getProfileFromLS();
  const { state } = useLocation();
  if (user != null && isLecturer(user)) return <Outlet />;
  return <Navigate to={state?.redirect || redirect} />;
};

export const routers = [
  { path: "/", element: <Home /> },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
  {
    path: "/my-business",
    element: <LecturerRoute redirect="/login" />,
    children: [{ index: true, element: <MyBusinessPage /> }],
  },
  {
    path: "/my-favorite",
    element: <AuthenticatedRoute redirect="/login" />,
    children: [{ index: true, element: <FavoritePage /> }],
  },
  {
    path: "/my-course",
    element: <AuthenticatedRoute redirect="/login" />,
    children: [{ index: true, element: <MyCoursePage /> }],
  },
  {
    path: "/course/create",
    element: <AuthenticatedRoute redirect="/login" />,
    children: [{ index: true, element: <CourseCreationPage /> }],
  },
  { path: "/course/:courseId/learning", element: <LectureDetail /> },
  { path: "/course/:courseId/view", element: <CourseDetail /> },
  {
    path: "/register-lecturer",
    element: <AuthenticatedRoute redirect="/login" />,
    children: [{ index: true, element: <RegisterLecturerPage /> }],
  },
  { path: "/blog/:blogId", element: null },
  { path: "/admin", element: <AdminHomePage /> },
  { path: "/admin/stats", element: <AdminStatsPage /> },
  { path: "/admin/approval", element: <AdminApprovalPage /> },
  { path: "*", element: <PageNotFound /> },
];
