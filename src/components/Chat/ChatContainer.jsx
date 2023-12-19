import { Box, Drawer } from "@mui/material";
import UserChatList from "./UserChatList";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import firebaseService from "@/app/firebase/firebaseService";
import MessageContainer from "./MessageContainer";

const ChatContainer = (props) => {
  const currentUser = useSelector((state) => state.user.user);
  const [isUserSaved, setIsUserSaved] = useState(false);
  // #region container on-off
  const { openDrawer, setOpenDrawer } = props;
  const closeDrawer = () => {
    setOpenDrawer(false);
  };
  // #endregion
  // #region chat
  useEffect(() => {
    const saveUserToFirestore = async () => {
      if (currentUser && !isUserSaved) {
        const usersCollection = collection(db, "users");
        const userQuery = query(
          usersCollection,
          where("username", "==", currentUser.username)
        );
        const existingUsers = await getDocs(userQuery);

        if (existingUsers.empty) {
          await firebaseService.addDocument("users", {
            id: currentUser.id,
            username: currentUser.username,
            avatar: currentUser.avatar || "/default-avatar.jpg",
            displayName: `${currentUser.firstName} ${currentUser.lastName}`,
          });
          setIsUserSaved(true);
        } else {
          setIsUserSaved(true);
        }
      }
    };

    saveUserToFirestore();
  }, [currentUser]);
  return (
    <>
      <Drawer anchor={"left"} open={openDrawer} onClose={closeDrawer}>
        <Box
          sx={{ width: 900, display: "flex", height: "100vh" }}
          role="presentation"
        >
          <UserChatList />
          <MessageContainer />
        </Box>
      </Drawer>
    </>
  );
};

export default ChatContainer;
