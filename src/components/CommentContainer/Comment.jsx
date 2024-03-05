import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  AlertCircleIcon,
  ChatIcon,
  EditIcon,
  FavoriteFullIcon,
  FavoriteIcon,
  MoreHorizonIcon,
  RemoveIcon,
} from "@/components/Icons";
import { Avatar } from "@/components/ui";
import { isEmptyObject } from "@/utils/utils";

const actions = [
  {
    key: "edit",
    icon: EditIcon,
  },
  {
    key: "remove",
    icon: RemoveIcon,
  },
  {
    key: "report",
    icon: AlertCircleIcon,
  },
];

/**
 * @param { user, text, createdDate } props
 * @returns
 */
const Comment = (props) => {
  const currentUser = useSelector((state) => state.user.user);
  const { user, content, createdDate, replyCount, level = 0 } = props;
  const { t } = useTranslation();

  const [openActionMenu, setOpenActionMenu] = useState(false);
  const toggleOpenActionMenu = (e) => {
    setOpenActionMenu((prev) => !prev);
  };

  return (
    <article
      className="rounded-lg bg-gray-100 px-6 py-3 text-base dark:bg-gray-600"
      style={{ marginLeft: `${level * 2}rem` }}
    >
      <header className="mb-2 flex items-center justify-between">
        <div className="flex flex-wrap items-center">
          <Link className="mr-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
            <Avatar src={user?.avatar || ""} isSignalShown={false} />
            <span>
              {user?.lastName} {user?.firstName}
            </span>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span title={createdDate}>{createdDate}</span>
          </p>
        </div>
        {isEmptyObject(currentUser) && (
          <button
            className="relative inline-flex items-center rounded-lg p-2 text-center text-sm font-medium 
           text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50
           dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
            onClick={toggleOpenActionMenu}
            onBlur={() => setOpenActionMenu(false)}
            onBlurCapture={() => setOpenActionMenu(false)}
          >
            <MoreHorizonIcon />
            <span className="sr-only">Comment settings</span>
            <div
              className="absolute right-0 top-[100%] z-10 hidden w-36 divide-y divide-gray-100 rounded
             bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
              style={{ display: openActionMenu && "block" }}
            >
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                {actions.map((act, idx) => (
                  <li key={idx}>
                    <button
                      className="flex w-full items-center justify-between px-4 py-2 
                  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {t(`comment.${act.key}`)}
                      <act.icon />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </button>
        )}
      </header>
      <p className="text-gray-500 dark:text-gray-400">{content}</p>
      <div className="mt-4 flex items-center space-x-4">
        <button className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
          {true ? <FavoriteFullIcon /> : <FavoriteIcon />}0 {t("comment.like")}
        </button>
        {!isEmptyObject(currentUser) && (
          <button className="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400">
            <ChatIcon />
            {t("comment.reply")}
          </button>
        )}
      </div>
    </article>
  );
};

export default Comment;
