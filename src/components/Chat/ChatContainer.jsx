import { Box, Drawer } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { db } from "@/app/firebase/config";
import firebaseService from "@/app/firebase/firebaseService";
import { isEmptyObject } from "@/utils/utils";
import MessageContainer from "./MessageContainer";
import UserChatList from "./UserChatList";

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
      if (!isEmptyObject(currentUser) && !isUserSaved) {
        const usersCollection = collection(db, "users");
        const userQuery = query(
          usersCollection,
          where("username", "==", currentUser.username),
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
      {/* <Drawer anchor={"left"} open={openDrawer} onClose={closeDrawer}> */}
      <div className="w-full dark:bg-gray-700">
        <div className="flex h-full w-full">
          <UserChatList />
          <span className="w-0 bg-slate-300 dark:bg-slate-700 md:w-[2px]"></span>
          <MessageContainer />
        </div>
      </div>
      {/* </Drawer> */}
    </>
  );
};

export default ChatContainer;
