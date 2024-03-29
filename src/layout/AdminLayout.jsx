import classNames from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import AdminNavbar from "@/components/common/AdminNavbar";
import AdminSidebar from "@/components/common/AdminSidebar";
import { ForbiddenPage } from "@/pages/errors";
import { isAdmin } from "@/utils/utils";

const AdminLayout = () => {
  const currentUser = useSelector((state) => state.user.user);

  // if (!isAdmin(currentUser)) return <ForbiddenPage />;
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <>
      <AdminNavbar setOpenSidebar={setOpenSidebar} />
      <div className="flex overflow-hidden bg-white pt-16 transition-all dark:bg-gray-800">
        <AdminSidebar open={openSidebar} />
        <main
          className={classNames(
            "relative h-full w-full overflow-y-auto bg-gray-50 p-4 transition-all",
            {
              " lg:ml-64": openSidebar,
              "lg:ml-16": !openSidebar,
            },
          )}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
