import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  createRoutesFromElements,
  useLocation,
} from "react-router-dom";

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

const AdminRoutes = createRoutesFromElements(
  <Route
    path="/admin"
    element={
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    }
  >
    <Route index element={<AdminHomePage />} />
    <Route path="/blogs" element={null} />
    <Route path="/users" element={null} />
    <Route path="/courses" element={null} />
    <Route path="/invoices" element={null} />
    <Route path="/stats" element={<AdminStatsPage />} />
    <Route path="/approval" element={<AdminApprovalPage />} />
  </Route>,
);

export default AdminRoutes;
