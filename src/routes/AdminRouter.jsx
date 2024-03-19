import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSnackbar } from "@/contexts/SnackbarContext";
import AdminLayout from "@/layout/AdminLayout";
import {
  AdminApprovalPage,
  AdminHomePage,
  AdminStatsPage,
} from "@/pages/admin";
import { isAdmin } from "@/utils/utils";

const AdminRoute = ({ redirect = "/" }) => {
  const currentUser = useSelector((state) => state.user.user);
  const { state } = useLocation();
  if (currentUser !== null && isAdmin(currentUser)) return <Outlet />;
  const { showSnackbar } = useSnackbar();
  showSnackbar({
    message: "You don't have permission to access this page!!!",
    severity: "error",
  });
  return <Navigate to={state?.redirect || redirect} />;
};

const AdminRouter = [
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminHomePage />,
      },
      {
        path: "blogs",
        element: null,
      },
      {
        path: "users",
        element: null,
      },
      {
        path: "courses",
        element: null,
      },
      {
        path: "invoices",
        element: null,
      },
      {
        path: "stats",
        element: <AdminStatsPage />,
      },
      {
        path: "approval",
        element: <AdminApprovalPage />,
      },
    ],
  },
];

export default AdminRouter;
