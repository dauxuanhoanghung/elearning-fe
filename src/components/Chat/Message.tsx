// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import classNames from "classnames";

import { RootState } from "@/app/store";
import { Avatar, Menu } from "@/components/ui";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { CopyIcon, DeleteIcon, ReplyIcon } from "../Icons/index";

type MessageProps = {
  id: string;
  text: string;
  senderId: string;
  avatar: string;
  senderInfo: any;
  recipientId: string;
  groupId: string;
  createdAt: string;
};

const Message: React.FC<MessageProps> = (props) => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  // #region redux user & chat
  const currentUser = useSelector((state: RootState) => state.user.user);
  const selectedChatUser = useSelector(
    (state: RootState) => state.chat.selectedChatInfo,
  );
  // #endregion
  const {
    id,
    text: message = "Hello world!!!! Ohaiyo sekai",
    senderId,
    avatar,
    senderInfo,
    recipientId,
    groupId,
    createdAt = "0:00 AM",
  } = props;
  const isMyMessage = senderId === currentUser.id;

  // #region Dropdown
  const [openAction, setOpenAction] = useState(false);
  const actions = [
    {
      icon: ReplyIcon,
      key: "message.reply",
      variant: "normal",
      onClick: null,
    },
    {
      icon: CopyIcon,
      key: "message.copy",
      variant: "normal",
      onClick: () => {
        navigator.clipboard.writeText(message);
        showSnackbar({ message: "Copy successfully!!!", severity: "success" });
      },
    },
    {
      icon: DeleteIcon,
      key: "message.delete",
      variant: "danger",
      onClick: null,
    },
  ];
  const menuRef = useRef(null);
  const handleContextMenu = (e) => {
    e.preventDefault();
    setOpenAction(true);
  };
  const handleCloseMenuAction = () => {
    setOpenAction(false);
  };
  useEffect(() => {
    const handleOutsideClick = (ev: any) => {
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
  // #endregion

  return (
    <article data-article="chat-message">
      <div className="select-none">
        <div
          className={classNames("mb-6 flex md:mb-5", {
            "justify-start": !isMyMessage,
            "justify-end": isMyMessage,
          })}
        >
          {!isMyMessage && (
            <div className="mx-2">
              <Avatar src={selectedChatUser?.avatar || avatar} />
            </div>
          )}
          <div
            className={classNames("flex items-end", {
              "flex-row": isMyMessage,
              "flex-row-reverse": !isMyMessage,
            })}
          >
            <div
              className={classNames(
                `group relative order-2 mx-2 max-w-[31.25rem] rounded-b-lg bg-indigo-50
                 px-5 py-4 transition duration-500 dark:bg-gray-600`,
                {
                  "rounded-tl-lg": isMyMessage,
                  "rounded-tr-lg": !isMyMessage,
                },
              )}
              onContextMenu={handleContextMenu}
            >
              <p
                className="text-sm font-normal leading-4 tracking-[.01rem] text-black
                opacity-60 outline-none dark:text-white dark:opacity-70"
              >
                {message}
              </p>
              <Menu open={openAction} setOpen={setOpenAction} ref={menuRef}>
                {actions.map((act, idx) => {
                  const cs = classNames(
                    `flex w-full items-center gap-4 border-b border-gray-200 px-4 py-3 text-sm opacity-60
                    outline-none transition-all duration-200 dark:border-gray-600 dark:opacity-70`,
                    {
                      "text-black hover:bg-gray-50 active:bg-gray-100 dark:text-white dark:hover:bg-gray-600 dark:focus:bg-gray-600":
                        act.variant === "normal",
                      "text-red-500 hover:bg-red-50 active:bg-red-100 dark:border-gray-600 dark:hover:bg-red-900 dark:hover:text-red-50":
                        act.variant === "danger",
                    },
                  );
                  return (
                    <button
                      key={idx}
                      className={cs}
                      onClick={() => {
                        handleCloseMenuAction();
                        if (act.onClick) act.onClick();
                      }}
                    >
                      <act.icon />
                      {t(act.key)}
                    </button>
                  );
                })}
              </Menu>
            </div>
            <div className="order-1 mx-2">
              <p
                className="whitespace-pre text-xs font-light leading-4 tracking-[.01rem]
               text-black opacity-60 outline-none dark:text-white dark:opacity-70"
              >
                {createdAt?.toDate().toString().substring(0, 24)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Message;
