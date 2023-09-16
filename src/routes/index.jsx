import Home from "../pages/home";
import Login from "../pages/login";
import signup from "../pages/signup";
import PageNotFound from "../pages/errors/notFound";

export const routers = [
  { path: "/", element: <Home /> },
  { path: "login", element: <Login /> },
  { path: "*", element: <PageNotFound /> },
];
