import Home from "../pages/home";
import Login from "../pages/login";
import signup from "../pages/signup";
import PageNotFound from "../pages/errors/notFound";
import Signup from "../pages/signup";
import CourseCreation from "../pages/admin/course/create";
import { getProfileFromLS } from "../utils/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isEmptyObject } from "../utils/utils";

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
  { path: "/course/create", element: <AuthenticatedRoute redirect='/login' />, children: [{ index: true, element: <CourseCreation /> }] },
  // { path: "/course/create", element: <CourseCreation /> },
  { path: "/course/:courseId", element: null },
  { path: "/blog/:blogId", element: null },
  { path: "*", element: <PageNotFound /> },
];
