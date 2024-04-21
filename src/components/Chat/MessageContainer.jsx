import {
  and,
  collection,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { db } from "@/app/firebase/config";
import firebaseService from "@/app/firebase/firebaseService";
import {
  BlockIcon,
  CallIcon,
  ChatCircleIcon,
  ChevronLeft,
  InfoIcon,
  MicrophoneIcon,
  MoreVerticalIcon,
} from "@/components/Icons";
import { Avatar, Menu } from "@/components/ui";
import { AttachmentIcon, SendIcon } from "../Icons/index";
import AddMemberButton from "./AddMemberButton";
import Message from "./Message";

const menuItems = [
  {
    icon: InfoIcon,
    key: "messageContainer.profile",
    variant: "normal",
  },
  {
    icon: CallIcon,
    key: "messageContainer.call",
    variant: "normal",
  },
  {
    icon: BlockIcon,
    key: "messageContainer.block",
    variant: "danger",
  },
];

const NoUserSelectedPage = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-12 flex h-full w-full flex-col items-center justify-center">
      <div
        className="mb-5 mr-4 flex h-10 w-10 items-center justify-center rounded-full 
        bg-gray-50 transition duration-500 dark:bg-gray-700"
      >
        <ChatCircleIcon className="h-12 w-12" />
      </div>
      <p
        className="mb-8 text-3xl font-semibold leading-4 tracking-[.01rem] text-black 
        opacity-60 outline-none dark:text-white dark:opacity-70"
      >
        {t("messageContainer.nochat")}
      </p>
      <p
        className="mb-3 flex text-lg font-normal leading-4 tracking-[.01rem] text-black 
        opacity-60 outline-none dark:text-white dark:opacity-70"
      >
        {t("messageContainer.detail")}
      </p>
    </div>
  );
};

const MessageContainer = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.user.user);
  const selectedChatUser = useSelector((state) => state.chat.selectedChatInfo);
  const isGroupSelected = useSelector((state) => state.chat.isGroup);
  console.log("selectedChatUser", selectedChatUser);

  // #region Chat message input
  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    // Prepare the message object based on isChatUser state
    const messageData = {
      text: message,
      senderId: currentUser.id,
      avatar: currentUser.avatar,
    };

    // Conditional addition of recipientId or groupId based on isChatUser
    if (isGroupSelected) {
      messageData.groupId = selectedChatUser.id;
      messageData.recipientId = null;
    } else {
      messageData.recipientId = selectedChatUser.id;
      messageData.groupId = null;
    }
    // Send the message
    await firebaseService.addDocument("messages", messageData);
    setMessage("");
  };
  // #endregion

  // #region messages show
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (!Boolean(selectedChatUser?.id)) return;
    let callQuery;
    const messageRef = collection(db, "messages");
    if (isGroupSelected) {
      callQuery = query(
        collection(db, "messages"),
        where("groupId", "==", selectedChatUser.id),
        orderBy("createdAt", "desc"),
        limit(15),
      );
    }
    // query cho 1vs1
    else
      callQuery = query(
        messageRef,
        or(
          and(
            where("senderId", "==", currentUser.id),
            where("recipientId", "==", selectedChatUser.id),
          ),
          and(
            where("senderId", "==", selectedChatUser.id),
            where("recipientId", "==", currentUser.id),
          ),
        ),
        orderBy("createdAt", "desc"),
        limit(15),
      );
    console.log("callQuery", callQuery);

    const unsubscribe = onSnapshot(callQuery, (QuerySnapshot) => {
      console.log(QuerySnapshot);
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages([...fetchedMessages].reverse());
    });

    return () => {
      unsubscribe();
    };
  }, [selectedChatUser?.id]);

  useEffect(() => {}, [selectedChatUser?.id]);
  // #endregion

  // #region right-click
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const toggleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };
  const handleCloseMenu = () => {
    setOpenMenu(false);
  };
  const handleOutsideClick = (ev) => {
    if (menuRef.current && !menuRef.current.contains(ev.target))
      handleCloseMenu();
  };
  useEffect(() => {
    if (openMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openMenu]);
  // #endregion

  if (!Boolean(selectedChatUser?.id)) return <NoUserSelectedPage />;

  return (
    <section
      data-section="chat-message-container"
      className="scrollbar-hidden absolute left-[0rem] z-10 h-screen w-full grow
      bg-white transition-all duration-500 dark:bg-gray-800 md:static md:w-fit"
    >
      <div className="scrollbar-hidden flex h-full flex-col">
        <div className="w-full border-b border-slate-300 dark:border-slate-700 dark:bg-slate-800">
          <div className="min-h-[5.25rem] w-full px-5 py-6">
            <div className="flex w-full items-center justify-center">
              <div className="group mr-4 md:hidden">
                <button
                  className="group flex h-7 w-7 items-center justify-center rounded-full outline-none
                  transition-all duration-200 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none
                  dark:hover:bg-gray-700 dark:focus:bg-gray-600"
                  title="close conversation"
                >
                  <ChevronLeft />
                </button>
              </div>
              {/* avatar & name */}
              <div className="flex grow">
                <button className="mr-5 outline-none">
                  <Avatar src={selectedChatUser.avatar} />
                </button>
                <div className="flex flex-col">
                  <p
                    className="mb-2 cursor-pointer text-sm font-semibold leading-4 tracking-[.01rem]
                  text-black opacity-60 outline-none dark:text-white dark:opacity-70"
                  >
                    {selectedChatUser?.displayName}
                  </p>
                  {/* <p
                    className="rounded-[.25rem] text-sm font-extralight leading-4 tracking-[.01rem]
                  text-black opacity-60 outline-none dark:text-white dark:opacity-70"
                  >
                    Last seen Dec 16, 2019
                  </p> */}
                </div>
              </div>
              {isGroupSelected && (
                <AddMemberButton groupId={selectedChatUser.id} />
              )}
              {/* ... */}
              <div className="relative" ref={menuRef}>
                <button
                  className="group flex h-7 w-7 items-center justify-center rounded-full outline-none 
                  transition-all duration-200 hover:bg-gray-50 focus:bg-gray-50 
                  dark:hover:bg-gray-700 dark:focus:bg-gray-600"
                  title="toggle conversation menu"
                  onClick={toggleOpenMenu}
                >
                  <MoreVerticalIcon />
                </button>
                <div title="open-conversation-menu">
                  <Menu open={openMenu} className="-left-40 top-2/3 w-48">
                    {menuItems.map((item, idx) => {
                      const classNames =
                        item.variant === "danger"
                          ? `flex w-full items-center border-b border-gray-200 px-4 py-3 text-sm 
                          opacity-60 outline-none transition-all duration-200 dark:border-gray-600 
                          dark:opacity-70 text-red-500 hover:bg-red-50 active:bg-red-100 
                          dark:hover:bg-red-900 dark:hover:text-red-50`
                          : `flex w-full items-center border-b border-gray-200 px-4 py-3 text-sm 
                          opacity-60 outline-none transition-all duration-200 dark:border-gray-600 
                          dark:opacity-70 text-black hover:bg-gray-50 active:bg-gray-100 
                          dark:text-white dark:hover:bg-gray-600 dark:focus:bg-gray-600`;

                      return (
                        <button
                          key={idx}
                          className={classNames}
                          onClick={handleCloseMenu}
                        >
                          <item.icon className="mr-2" />
                          {t(item.key)}
                        </button>
                      );
                    })}
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          <div className="relative transition-[padding] duration-200"></div>
        </div>
        <div className="scrollbar-hidden flex grow flex-col overflow-y-scroll px-5 py-5">
          {messages.map((m, idx) => (
            <Message key={idx} {...m} />
          ))}
        </div>
        <div className="w-full">
          <div className="relative transition-all duration-200"></div>
          <div className="flex h-auto min-h-[5.25rem] items-end p-5">
            <div className="min-h-[2.75rem]">
              <button
                className="group group mr-4 flex h-7 w-7 items-center justify-center rounded-full 
                outline-none transition-all duration-200 hover:bg-gray-50 focus:bg-gray-50 
                focus:outline-none dark:text-slate-400 dark:hover:bg-gray-700 dark:focus:bg-gray-600 md:mr-5 "
                title="open select attachments modal"
              >
                <AttachmentIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mr-4 grow self-end md:mr-5">
              <div className="relative">
                <textarea
                  className="scrollbar-hidden max-h-[5rem] w-full resize-none content-center rounded-sm
                  border-opacity-0 bg-gray-50 px-5 py-4 pr-[3.125rem] text-sm text-black
                  text-opacity-70 outline-none transition duration-200 ease-out placeholder:text-black
                  placeholder:opacity-40 dark:border-opacity-70 dark:bg-gray-700 dark:bg-opacity-70
                  dark:text-white dark:placeholder:text-white dark:placeholder:opacity-70"
                  rows="1"
                  placeholder="Write your message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="min-h-[2.75rem]"></div>
            <div className="flex min-h-[2.75rem]">
              <button
                className="group group mr-4 flex h-7 w-7 items-center justify-center rounded-full 
                outline-none transition-all duration-200 hover:bg-gray-50 focus:bg-gray-50 
                focus:outline-none dark:hover:bg-gray-700 dark:focus:bg-gray-600 md:mr-5"
                title="start recording"
              >
                <MicrophoneIcon />
              </button>
              <button
                className="group group flex h-7 w-7 items-center justify-center rounded-full
                bg-indigo-300 outline-none transition-all duration-200 hover:bg-indigo-400
                focus:bg-indigo-400 focus:outline-none active:scale-110 dark:bg-indigo-400
                dark:text-white dark:hover:bg-indigo-400 dark:focus:bg-indigo-300"
                title="send message"
                onClick={sendMessage}
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageContainer;
