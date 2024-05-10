import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";

import ChatContainer from "@/components/Chat/ChatContainer";

import { RootState } from "@/app/store";
import { Footer, Header } from "@/components/common";
import { useOpenChatDrawer } from "@/contexts/OpenChatDrawerContext";
import { isEmptyObject } from "@/utils/utils";

const DefaultLayout: React.FC<{ children?: any }> = () => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const { openChatDrawer, setOpenChatDrawer } = useOpenChatDrawer();
  const handleOpenChat = () => {
    setOpenChatDrawer(true);
  };

  return (
    <>
      <Header />
      <div className="bg-white text-gray-900 transition-all dark:bg-gray-800 dark:text-gray-50">
        <Outlet />
        {/* {children} */}
      </div>
      {!isEmptyObject(currentUser) && (
        <div>
          <ChatContainer
            openDrawer={openChatDrawer}
            setOpenDrawer={setOpenChatDrawer}
          />
          <div
            className="fixed top-1/2 cursor-pointer"
            onClick={handleOpenChat}
          >
            <MarkUnreadChatAltOutlinedIcon fontSize="large" />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};
export default DefaultLayout;
