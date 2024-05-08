import classNames from "classnames";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "@/components/common/AdminNavbar";
import AdminSidebar from "@/components/common/AdminSidebar";

const AdminLayout: React.FC<{ children?: any }> = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);

  return (
    <>
      <AdminNavbar setOpenSidebar={setOpenSidebar} />
      <div className="flex overflow-hidden bg-white pt-16 transition-all dark:bg-gray-800">
        <AdminSidebar open={openSidebar} />
        <main
          className={classNames(
            "relative min-h-screen w-full overflow-y-auto bg-gray-50 p-4 transition-all dark:bg-gray-800",
            {
              "lg:ml-64": openSidebar,
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
