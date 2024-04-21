import { useQuery } from "@tanstack/react-query";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { db } from "@/app/firebase/config";
import firebaseService from "@/app/firebase/firebaseService";
import { changeChatGroup, changeChatUser } from "@/app/store/chatSlice";
import { isEmptyObject } from "@/utils/utils";
import { EditIcon, FindIcon } from "../Icons/index";
import CreateGroupButton from "./CreateGroupButton";
import GroupInfo from "./GroupInfo";
import UserInfo from "./UserInfo";

const UserChatList = () => {
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // #region chat users show and actions
  const handleChangeChatUser = (user) => {
    console.log("user", user);
    dispatch(
      changeChatUser({
        ...user,
        createdAt: user.createdAt.toDate().toString(),
      }),
    );
  };

  const { data: chatUsers } = useQuery({
    queryKey: ["chatUsers", { currentUserId: currentUser.id }],
    queryFn: async () => {
      try {
        if (isEmptyObject(currentUser)) return;
        return await firebaseService.getUsersHaveChatWithCurrentUser(
          currentUser.id,
        );
      } catch {
        return [];
      }
    },
    initialData: [],
  });
  // #endregion

  // #region chat groups show and actions
  const [chatGroups, setChatGroups] = useState([]);
  useEffect(() => {
    const groupsRef = collection(db, "groups");
    // Create a query against the collection.
    const q = query(
      groupsRef,
      where("userIds", "array-contains", currentUser.id),
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      console.log(QuerySnapshot);
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data() });
      });
      setChatGroups([...fetchedMessages].reverse());
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser?.id]);
  const handleChangeChatGroup = (group) => {
    console.log("group", group);
    dispatch(
      changeChatGroup({
        ...group,
        createdAt: group.createdAt.toDate().toString(),
      }),
    );
  };
  // #endregion

  return (
    <aside
      className="grow-1 scrollbar-hidden flex h-screen w-full max-w-[33%] flex-col overflow-visible overflow-y-scroll 
      px-5 transition-all duration-500 dark:bg-gray-800 md:grow-0 md:overflow-visible md:p-0"
    >
      <div className="flex h-full flex-col">
        <div className="flex max-h-fit min-h-[5rem] w-full items-center justify-between px-5 py-6">
          <p className="text-xl leading-4 tracking-[.01rem] text-black opacity-60 outline-none dark:text-white">
            Messages
          </p>
          <div>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full outline-none 
              transition-all duration-200 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none 
              dark:hover:bg-gray-700 dark:focus:bg-gray-600"
              title="compose conversation"
            >
              <EditIcon className="text-indigo-300 hover:text-indigo-400" />
            </button>
          </div>
        </div>
        <div className="px-5 pb-6 md:pb-5">
          <div className="relative">
            <i className="absolute left-0 top-1/2 mx-2 translate-y-[-50%] text-center">
              <FindIcon className="text-black opacity-40 dark:text-white dark:opacity-70" />
            </i>
            <input
              type="text"
              placeholder="Search.."
              className="h-8 w-full rounded-sm border border-none bg-gray-50 px-7 py-3 text-black 
              text-opacity-70 outline-none transition duration-200 ease-out placeholder:text-black 
              placeholder:opacity-40 focus:bg-white focus:outline-none focus:ring focus:ring-indigo-100 
              dark:bg-gray-700 dark:text-white dark:opacity-70 dark:placeholder:text-white 
              dark:placeholder:opacity-70 dark:focus:bg-gray-800"
            />
          </div>
        </div>
        <section
          data-section="conversations"
          className="scrollbar-hidden w-full scroll-smooth"
          style={{ overflow: "visible scroll" }}
        >
          {chatUsers.map((user, idx) => (
            <div onClick={() => handleChangeChatUser(user)} key={idx}>
              <UserInfo {...user} />
            </div>
          ))}
          {chatGroups.map((group, idx) => (
            <div onClick={() => handleChangeChatGroup(group)} key={idx}>
              <GroupInfo {...group} />
            </div>
          ))}
          <CreateGroupButton />
        </section>
      </div>
    </aside>
  );
};

export default UserChatList;
