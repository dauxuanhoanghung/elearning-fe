import { Box, Divider, List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import firebaseService from "@/app/firebase/firebaseService";
import { changeChatUser } from "@/app/store/chatSlice";
import { EditIcon, FindIcon } from "../Icons/index";
import UserInfo from "./UserInfo";

const UserChatList = () => {
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleChangeChatUser = (user) => {
    // dispatch(
    //   changeChatUser({
    //     ...user,
    //     createdAt: user.createdAt.toDate().toString(),
    //   }),
    // );
  };
  const [chatUsers, setChatUsers] = useState([{}, {}, {}, {}, {}]);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const usersHaveChatWithCurrentUser =
  //         await firebaseService.getUsersHaveChatWithCurrentUser(currentUser.id);
  //       setChatUsers(usersHaveChatWithCurrentUser || []);
  //     } catch (error) {
  //       console.error("Error fetching users: ", error);
  //     }
  //   };

  //   fetchUsers();
  // }, [currentUser.id]);
  return (
    <aside
      className="xs:w-full xs:px-5 xs:grow-1 xs:overflow-y-scroll scrollbar-hidden flex h-[50rem] max-w-xl flex-col 
      overflow-visible transition-all duration-500 dark:bg-gray-800 md:grow-0 md:overflow-visible md:p-0"
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
        <div className="xs:pb-6 px-5 md:pb-5">
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
          className="h-full w-full scroll-smooth"
          style={{ overflow: "visible scroll" }}
        >
          {chatUsers.map((user, idx) => (
            <UserInfo {...user} key={idx} />
          ))}
        </section>
      </div>
    </aside>
  );
};

export default UserChatList;

const ComposeModal = () => {
  return (
    <div
      role="dialog"
      className="relative z-20"
      aria-hidden="true"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-60 transition-opacity"
        // style="display: none;"
      ></div>
      <div
        className="fixed inset-0 z-10 h-full overflow-y-auto"
        // style="display: none;"
      >
        <div
          id="close-modal"
          className="flex h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div className="w-[18.75rem] rounded bg-white pt-6 dark:bg-gray-800">
            <div className="mb-6 flex items-center justify-between px-5">
              <p
                className="default-outline text-xl leading-4 tracking-[.01rem] text-black opacity-60 dark:text-white"
                id="modal-title"
                tabindex="0"
              >
                Compose
              </p>
              <button
                tabindex="0"
                className="group group flex items-center justify-center rounded-sm border border-gray-200 p-3 px-4 py-2 outline-none transition-all duration-200 ease-out hover:border-red-100 hover:bg-red-100 focus:border-red-100 focus:bg-red-100 focus:outline-none dark:border-white dark:border-opacity-70 dark:hover:border-red-400 dark:hover:bg-red-400 dark:focus:border-red-400 dark:focus:bg-red-400"
              >
                <p className="text-xs font-light leading-4 tracking-[.01rem] text-black opacity-60 outline-none dark:text-white dark:opacity-70">
                  esc
                </p>
              </button>
            </div>
            <div className="px-5 pb-5">
              <div className="flex items-center rounded-sm bg-gray-50 p-2 dark:bg-gray-700">
                <button className="text-md mr-1 basis-1/2 rounded-sm bg-indigo-400 p-4 leading-4 tracking-[.01rem] text-white outline-none transition-all duration-200 focus:outline-none">
                  Contact
                </button>
                <button className="text-md basis-1/2 rounded-sm p-4 leading-4 tracking-[.01rem] text-black opacity-60 outline-none transition-all duration-200 focus:outline-none dark:text-white dark:opacity-70">
                  Group
                </button>
              </div>
            </div>
            <div className="pb-6">
              <div className="mx-5 mb-5">
                <div className="relative">
                  <i className="absolute left-0 top-[.6563rem] ml-3 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 stroke-2 text-black opacity-40 dark:text-white dark:opacity-70"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      ></path>
                    </svg>
                  </i>
                  <input
                    type="text"
                    placeholder="Search.."
                    className="h-8 w-full rounded-sm border border-none bg-gray-50 px-7 py-3 text-black text-opacity-70 outline-none transition duration-200 ease-out placeholder:text-black placeholder:opacity-40 focus:bg-white focus:outline-none focus:ring focus:ring-indigo-100 dark:bg-gray-700 dark:text-white dark:opacity-70 dark:placeholder:text-white dark:placeholder:opacity-70 dark:focus:bg-gray-800"
                  />
                  <div className="absolute right-0 top-0"></div>
                </div>
              </div>
              <div
                className="scrollbox dark max-h-[12.5rem] overflow-y-scroll"
                tabindex="0"
              >
                <div className="scrollbox-content">
                  <div>
                    <a
                      href="#"
                      className="flex w-full p-5 outline-none transition duration-200 ease-out hover:bg-indigo-50 focus:bg-indigo-50 active:bg-indigo-100 dark:hover:bg-gray-600 dark:focus:bg-gray-600"
                    >
                      <div className="mr-4">
                        <div
                          className="h-7 w-7 rounded-full bg-cover bg-center"
                          // style='background-image: url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=387&amp;q=80");'
                        ></div>
                      </div>
                      <div className="flex w-full flex-col items-start">
                        <div className="mb-3 flex w-full items-center justify-between">
                          <div href="#" className="flex items-center">
                            <p className="text-sm font-semibold leading-4 tracking-[.01rem] text-black opacity-60 outline-none dark:text-white dark:opacity-70">
                              Ahmed Ali
                            </p>
                          </div>
                          <div className="relative"></div>
                        </div>
                        <p className="text-sm font-normal leading-4 tracking-[.01rem] text-black opacity-60 outline-none dark:text-white dark:opacity-70">
                          Last seen 2:30 am
                        </p>
                      </div>
                      <div className="flex h-full flex-col items-center justify-center"></div>
                    </a>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="flex w-full p-5 outline-none transition duration-200 ease-out hover:bg-indigo-50 focus:bg-indigo-50 active:bg-indigo-100 dark:hover:bg-gray-600 dark:focus:bg-gray-600"
                    >
                      <div className="mr-4">
                        <div
                          className="h-7 w-7 rounded-full bg-cover bg-center"
                          // style='background-image: url("https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=870&amp;q=80");'
                        ></div>
                      </div>
                      <div className="flex w-full flex-col items-start">
                        <div className="mb-3 flex w-full items-center justify-between">
                          <div href="#" className="flex items-center">
                            <p className="text-sm font-semibold leading-4 tracking-[.01rem] text-black opacity-60 outline-none dark:text-white dark:opacity-70">
                              Allen Carr
                            </p>
                          </div>
                          <div className="relative"></div>
                        </div>
                        <p className="text-sm font-normal leading-4 tracking-[.01rem] text-black opacity-60 outline-none dark:text-white dark:opacity-70">
                          Last seen 2:30 am
                        </p>
                      </div>
                      <div className="flex h-full flex-col items-center justify-center"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
