import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import classNames from "classnames";
import { DeleteIcon, InfoIcon } from "../Icons";
import { Avatar } from "../common";

const UserInfo = (props) => {
  const {
    avatar,
    displayName = "Sample name",
    id,
    text: message = "This's a sample message for test",
    lastUpdate = "1:30 PM",
  } = props;
  const selectedChatUser = useSelector((state) => state.chat.selectedChatUser);

  const menuRef = useRef(null);
  const [openAction, setOpenAction] = useState(false);
  // right-click
  const handleContextMenu = (e) => {
    e.preventDefault();
    setOpenAction(true);
  };
  const handleCloseMenuAction = () => {
    setOpenAction(false);
  };
  useEffect(() => {
    const handleOutsideClick = (ev) => {
      if (menuRef.current && !menuRef.current.contains(ev.target))
        handleCloseMenuAction();
    };
    if (openAction) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openAction]);

  return (
    <div className="relative select-none" onContextMenu={handleContextMenu}>
      <button
        className="flex w-full rounded p-3 transition duration-500 ease-out hover:bg-indigo-50
        focus:bg-indigo-50 focus:outline-none active:bg-indigo-100 dark:hover:bg-gray-600 
        dark:focus:bg-gray-600 dark:active:bg-gray-600"
      >
        <div className="mr-4">
          <Avatar src={avatar} style={{ width: "2.5rem", height: "2.5rem" }} />
        </div>
        <div className="flex w-full flex-col">
          <div className="w-full">
            <div className="flex items-start">
              <div className="mb-2 grow text-start">
                <p
                  className="text-sm font-semibold leading-4 tracking-[.01rem] text-black 
                  opacity-60 outline-none dark:text-white dark:opacity-70"
                >
                  {displayName}
                </p>
              </div>
              <p
                className="text-xs font-light leading-4 tracking-[.01rem] text-black 
                opacity-60 outline-none dark:text-white dark:opacity-70"
              >
                {lastUpdate}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p
                className="flex items-center justify-start text-sm font-normal leading-4 tracking-[.01rem] 
                text-black opacity-60 outline-none dark:text-white dark:opacity-70"
              >
                {message}
              </p>
            </div>
          </div>
        </div>
      </button>
      <div
        ref={menuRef}
        tabIndex={0}
        className={classNames(
          `absolute right-3 top-0 z-[100] mt-2 w-[12.5rem] rounded-sm border border-gray-100 
        bg-white shadow-lg focus:outline-none dark:border-gray-600 dark:bg-gray-800`,
          {
            hidden: !openAction,
          },
        )}
      >
        <button
          onClick={handleCloseMenuAction}
          className="flex w-full items-center border-b border-gray-200 px-4 py-3 text-sm text-black 
          opacity-60 outline-none transition-all duration-200 hover:bg-gray-100 active:bg-gray-100 
          dark:border-gray-600 dark:text-white dark:opacity-70 dark:hover:bg-gray-600 dark:focus:bg-gray-600"
        >
          <InfoIcon />
          Conversation info
        </button>
        <button
          onClick={handleCloseMenuAction}
          className="flex w-full items-center border-b border-gray-200 px-4 py-3 text-sm
              text-red-500 opacity-60 outline-none transition-all duration-200 hover:bg-red-50
              active:bg-red-100 dark:border-gray-600 dark:opacity-70 dark:hover:bg-red-900
              dark:hover:text-red-50"
        >
          <DeleteIcon />
          Delete conversation
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
