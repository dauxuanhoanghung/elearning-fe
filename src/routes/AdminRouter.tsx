import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { RootState } from "@/app/store";
import { useSnackbar } from "@/contexts/SnackbarContext";
import AdminLayout from "@/layout/AdminLayout";
import {
  AdminApprovalPage,
  AdminHomePage,
  AdminListCoursePage,
  AdminListInvoicesPage,
  AdminListUserPage,
  AdminStatsPage,
} from "@/pages/admin";
import { isAdmin } from "@/utils/utils";

const AdminRoute = ({ redirect = "/" }) => {
  const currentUser = useSelector((state: RootState) => state.user.user);
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
      <AdminLayout>
        <AdminRoute></AdminRoute>
      </AdminLayout>
    ),
    children: [
      {
        index: true,
        element: <AdminHomePage />,
      },
      {
        path: "users",
        element: <AdminListUserPage />,
      },
      {
        path: "courses",
        element: <AdminListCoursePage />,
      },
      {
        path: "invoices",
        element: <AdminListInvoicesPage />,
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
