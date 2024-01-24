import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import { Box } from "@mui/material";

import ChatContainer from "@/components/Chat/ChatContainer";

import { Footer, Header } from "@/components/common";
import { useOpenChatDrawer } from "@/contexts/OpenChatDrawerContext";
import { isEmptyObject } from "@/utils/utils";

const DefaultLayout = ({ children }) => {
  const currentUser = useSelector((state) => state.user.user);
  const { openChatDrawer, setOpenChatDrawer } = useOpenChatDrawer();
  const handleOpenChat = () => {
    setOpenChatDrawer(true);
  };

  return (
    <>
      <Header />
      <div className="bg-white transition-all dark:bg-gray-800">
        <Outlet />
        {children}
      </div>
      {!isEmptyObject(currentUser) && (
        <Box>
          <ChatContainer
            openDrawer={openChatDrawer}
            setOpenDrawer={setOpenChatDrawer}
          />
          <Box
            sx={{ position: "fixed", top: "50%", cursor: "pointer" }}
            onClick={handleOpenChat}
          >
            <MarkUnreadChatAltOutlinedIcon fontSize="large" />
          </Box>
        </Box>
      )}
      <Footer />
    </>
  );
};
export default DefaultLayout;
