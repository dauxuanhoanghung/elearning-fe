import Home from "../pages/home";
import Login from "../pages/login";
import signup from "../pages/signup";
import PageNotFound from "../pages/errors/notFound";
import Signup from "../pages/signup";

export const routers = [
  { path: "/", element: <Home /> },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
  { path: "/course/:courseId", element: null},
  { path: "/blog/:blogId", element: null},
  { path: "*", element: <PageNotFound /> },
];
