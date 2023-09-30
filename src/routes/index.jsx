import Home from "../pages/home";
import Login from "../pages/login";
import PageNotFound from "../pages/errors/notFound";
import Signup from "../pages/signup";
import CourseCreation from "../pages/admin/course/create";
import { getProfileFromLS } from "../utils/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isEmptyObject } from "../utils/utils";
import CourseDetail from "../pages/courseDetail";
import LectureDetail from "../pages/lectureDetail";
import FavoritePage from "../pages/favorite";

const AuthenticatedRoute = ({ redirect = "/" }) => {
  const user = getProfileFromLS();
  const { state } = useLocation();
  if (user === null || isEmptyObject(user))
    return <Navigate to={state?.redirect || redirect} />;
  return <Outlet />;
};

export const routers = [
  { path: "/", element: <Home /> },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
  { path: "/my-favorite", element: <AuthenticatedRoute redirect='/login' />, children: [{ index: true, element: <FavoritePage /> }]},
  { path: "/course/create", element: <AuthenticatedRoute redirect='/login' />, children: [{ index: true, element: <CourseCreation /> }] },
  { path: "/course/:courseId/learning/", element: <LectureDetail /> },
  { path: "/course/:courseId/view", element: <CourseDetail /> },
  { path: "/blog/:blogId", element: null },
  { path: "*", element: <PageNotFound /> },
];
