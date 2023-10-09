import { Box } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import ChatContainer from "../components/Chat/ChatContainer";
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import AdminDrawer from "../components/AdminDrawer";
import { useSelector } from "react-redux";
import { isAdmin } from "../utils/utils";

const DefaultLayout = ({ children }) => {
  const currentUser = useSelector(state => state.user.user);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenChat = () => {
    setOpenDrawer(true);
  }

  const [openAdminDrawer, setOpenAdminDrawer] = useState(false);
  const handleOpenAdminDrawer = () => {
    setOpenAdminDrawer(true);
  }
  return (
    <>
      <Navbar />
      <Box sx={{ width: "90%", margin: "20px auto 30px" }}>{children}</Box>
      <Box>
        {openDrawer && <ChatContainer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />}
        <Box sx={{ position: "fixed", top: "50%", cursor: "pointer" }} onClick={handleOpenChat}>
          <MarkUnreadChatAltOutlinedIcon size="large" />
        </Box>
      </Box>
      {isAdmin(currentUser) && (
        <Box>
          <AdminDrawer openDrawer={openAdminDrawer} setOpenDrawer={setOpenAdminDrawer} />
          <Box sx={{ position: "fixed", top: "50%", cursor: "pointer", right: "0" }} onClick={handleOpenAdminDrawer}>
            <MarkUnreadChatAltOutlinedIcon size="large" />
          </Box>
        </Box>
      )}
      <Footer />
    </>
  );
};
export default DefaultLayout;
