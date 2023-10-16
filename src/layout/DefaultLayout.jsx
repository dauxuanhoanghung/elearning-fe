import { Box } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import ChatContainer from "../components/Chat/ChatContainer";
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AdminDrawer from "../components/AdminDrawer";
import { useSelector } from "react-redux";
import { isAdmin, isEmptyObject } from "../utils/utils";
import { useOpenChatDrawer } from "../contexts/OpenChatDrawerContext";

const DefaultLayout = ({ children }) => {
  const currentUser = useSelector(state => state.user.user);
  const { openChatDrawer, setOpenChatDrawer } = useOpenChatDrawer();
  const handleOpenChat = () => {
    setOpenChatDrawer(true);
  }

  const [openAdminDrawer, setOpenAdminDrawer] = useState(false);
  const handleOpenAdminDrawer = () => {
    setOpenAdminDrawer(true);
  }

  return (
    <>
      <Navbar />
      <Box sx={{ width: "90%", margin: "20px auto 30px" }}>{children}</Box>
      {!isEmptyObject(currentUser) && (
        <Box>
          <ChatContainer openDrawer={openChatDrawer} setOpenDrawer={setOpenChatDrawer} />
          <Box sx={{ position: "fixed", top: "50%", cursor: "pointer" }} onClick={handleOpenChat}>
            <MarkUnreadChatAltOutlinedIcon fontSize="large" />
          </Box>
        </Box>
      )}
      {isAdmin(currentUser) && (
        <Box>
          <AdminDrawer openDrawer={openAdminDrawer} setOpenDrawer={setOpenAdminDrawer} />
          <Box sx={{ position: "fixed", top: "50%", cursor: "pointer", right: "0" }} onClick={handleOpenAdminDrawer}>
            <AdminPanelSettingsOutlinedIcon fontSize="large" />
          </Box>
        </Box>
      )}
      <Footer />
    </>
  );
};
export default DefaultLayout;
