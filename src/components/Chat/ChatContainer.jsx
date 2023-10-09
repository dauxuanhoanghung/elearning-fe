import { Box, Drawer } from "@mui/material";
import UserChatList from "./UserChatList";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { db } from "../../app/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import firebaseService from "../../app/firebase/firebaseService";

const ChatContainer = (props) => {
  const currentUser = useSelector((state) => state.user.user);
  const [isUserSaved, setIsUserSaved] = useState(false);
  // #region container on-off
  const { openDrawer, setOpenDrawer } = props
  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(!openDrawer);
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
  }
  // #endregion
  // #region chat
  useEffect(() => {
    const saveUserToFirestore = async () => {
      if (currentUser && !isUserSaved) {
        const usersCollection = collection(db, 'users');
        const userQuery = query(usersCollection, where('username', '==', currentUser.username));
        const existingUsers = await getDocs(userQuery);

        if (existingUsers.empty) {
          await firebaseService.addDocument('users', {
            userId: currentUser.id,
            username: currentUser.username,
            avatar: currentUser.avatar || "https://www.shutterstock.com/vi/image-vector/default-avatar-profile-icon-social-media-1913928688",
            displayName: `${currentUser.firstName} ${currentUser.lastName}`
          });
          setIsUserSaved(true);
        }
        else {
          setIsUserSaved(true);
        }
      }
    };

    saveUserToFirestore();
  }, [currentUser]);
  return <>
    <Drawer
      anchor={"left"}
      open={openDrawer}
      onClose={toggleDrawer}
    >
      <Box
        sx={{ width: 900, display: 'flex', height: "100vh" }}
        role="presentation"
        onKeyDown={closeDrawer}
      >
        <UserChatList />
      </Box>
    </Drawer>
  </>
}

export default ChatContainer;