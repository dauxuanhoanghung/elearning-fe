import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { db } from "@/app/firebase/config";
import firebaseService from "@/app/firebase/firebaseService";
import { Sheet, SheetContent } from "@/components/ui/sheet";
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
      // Neu chua login, hoac isUserSaved (ko phai lan dau) => return
      if (isEmptyObject(currentUser) || isUserSaved) return;

      const usersCollection = collection(db, "users");

      const userQuery = query(
        usersCollection,
        where("username", "==", currentUser.username),
      );

      const existingUsers = await getDocs(userQuery);
      console.log("existingUsers", existingUsers);
      if (existingUsers.empty) {
        await firebaseService.saveDocWithId("users", currentUser.id, {
          id: currentUser.id,
          username: currentUser.username,
          avatar: currentUser.avatar || "/default-avatar.jpg",
          displayName: `${currentUser.firstName} ${currentUser.lastName}`,
          groups: [],
          email: currentUser.email,
        });
      }

      setIsUserSaved(true);
    };

    saveUserToFirestore();
  }, [currentUser]);
  // #endregion

  return (
    <Sheet open={openDrawer} onOpenChange={setOpenDrawer}>
      <SheetContent side="left" className="w-[400px] sm:w-[70vw]">
        <div className="w-full dark:bg-gray-700">
          <div className="flex h-full w-full">
            <UserChatList />
            <span className="w-0 bg-slate-300 dark:bg-slate-700 md:w-[2px]"></span>
            <MessageContainer />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatContainer;
