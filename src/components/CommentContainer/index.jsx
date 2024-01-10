import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AttachmentIcon, ImageIcon } from "@/components/Icons";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { courseCommentService, lectureCommentService } from "@/services";
import { isEmptyObject } from "@/utils/utils";
import Comment from "./Comment";

const CommentContainer = (props) => {
  const currentUser = useSelector((state) => state.user.user);
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const {
    comments = [],
    setComments,
    courseId,
    lectureId,
    blogId,
    getMoreComments,
    page,
  } = props;

  const [newComment, setNewComment] = useState("");
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log(newComment);
    let res = null;
    if (courseId) {
      const request = { content: newComment, course: courseId };
      res = await courseCommentService.createComment(request);
      setComments([newComment, ...comments]);
    } else if (lectureId) {
      const request = { content: newComment, lecture: lectureId };
      res = await lectureCommentService.createComment(request);
      setComments([newComment, ...comments]);
    } else if (blogId) {
    }
    if (res?.data.status === 201) {
      setNewComment("");
      showSnackbar({
        message: "Comment successfully created",
        severity: "success",
      });
    }
  };

  return (
    <section
      data-section="comment-section"
      className="mx-auto w-full max-w-5xl px-2 md:px-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white lg:text-2xl">
          {t("commentContainer.discussion")}
        </h2>
        {!isEmptyObject(currentUser) && (
          <div>
            <button
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm 
            font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-700 dark:border-gray-600
          dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {t("commentContainer.subscribe")}
            </button>
          </div>
        )}
      </div>
      {!isEmptyObject(currentUser) ? (
        <form className="mb-4 shadow-sm">
          <div
            className="mb-4 w-full rounded-lg border border-gray-100 bg-gray-50
         dark:border-gray-600 dark:bg-gray-700"
          >
            <div className="rounded-t-lg bg-gray-50 px-4 py-2 dark:bg-gray-800">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                rows="4"
                value={newComment}
                onChange={handleCommentChange}
                onKeyUp={(e) => e.key === "Enter" && handleCommentSubmit(e)}
                className="w-full border-0 bg-gray-50 px-0 text-sm text-gray-900 outline-none
              placeholder:text-gray-400 dark:bg-gray-800 dark:text-white"
                placeholder={t("commentContainer.placeholder")}
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
              <button
                onClick={(e) => handleCommentSubmit(e)}
                className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs 
              font-medium text-white hover:bg-blue-800 focus:ring-blue-200 dark:focus:ring-blue-900"
              >
                Post comment
              </button>
              <div className="flex pl-0 md:pl-2">
                <button
                  type="button"
                  className="inline-flex cursor-pointer justify-center rounded p-2
                text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400
                dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <AttachmentIcon />
                  <span className="sr-only">Attach file</span>
                </button>
                <button
                  type="button"
                  className="inline-flex cursor-pointer justify-center rounded p-2
                text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400
                dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <ImageIcon />
                  <span className="sr-only">Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <h1 className="text-dark text-lg dark:text-gray-200">
          {t("commentContainer.please")}
          <Link to="/login">
            <span className="text-blue-600">{t("commentContainer.login")}</span>
          </Link>
          {t("commentContainer.behindLogin")}
        </h1>
      )}
      <ul>
        {comments.map((comment, index) => (
          <li className="my-2" key={index}>
            <Comment {...comment} />
          </li>
        ))}
      </ul>
      {page !== -1 && (
        <button
          className="mt-4 text-blue-500 focus:outline-none"
          onClick={getMoreComments}
        >
          Show more...
        </button>
      )}
    </section>
  );
};

export default CommentContainer;
