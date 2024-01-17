import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import AdminSidebar from "@/components/common/AdminSidebar";
import { ForbiddenPage } from "@/pages/errors";
import { isAdmin } from "@/utils/utils";

const AdminLayout = () => {
  const currentUser = useSelector((state) => state.user.user);

  if (!isAdmin(currentUser)) return <ForbiddenPage />;

  return (
    <div className="">
      <AdminSidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
