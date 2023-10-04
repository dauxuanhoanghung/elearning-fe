import { Box } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import ChatContainer from "../components/Chat/ChatContainer";
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';

const DefaultLayout = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenChat = () => {
    setOpenDrawer(true);
  }
  return (
    <>
      <Navbar />
      <Box sx={{ width: "90%", margin: "15px auto" }}>{children}</Box>
      <ChatContainer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <Box sx={{ position: "fixed", top: "50%", cursor: "pointer" }} onClick={handleOpenChat}>
        <MarkUnreadChatAltOutlinedIcon size="large" />
      </Box>
      <Footer />
    </>
  );
};
export default DefaultLayout;
