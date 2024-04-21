import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import CommentContainer from "@/components/CommentContainer";
import LectureDetail from "@/components/LectureDetail";
import LectureList from "@/components/LectureList";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { lectureCommentService } from "@/services";

const LectureDetailPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();
  const lectureId = searchParams.get("lectureId");

  // #region comments
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const getCommentsByLectureId = async () => {
    if (!lectureId) return;
    if (page === -1) return;
    let res = await lectureCommentService.getCommentsByLectureId(
      lectureId,
      page,
    );
    if (res.data.length > 0) {
      setComments([...comments, ...res.data]);
      setPage(page + 1);
    } else setPage(-1);
  };
  useEffect(() => {
    getCommentsByLectureId(lectureId);
  }, []);
  // #endregion
  useEffect(() => {
    if (!lectureId) {
      showSnackbar({ message: "Invalid route", severity: "error" });
      navigate("/");
    }
  });

  useEffect(() => {
    window.scrollTo(0, 140); // Scroll to the top of the page
  }, [location.pathname]);

  return (
    <main data-component="lecture-detail-page" className="">
      <div className="grid grid-cols-1 sm:grid-cols-7">
        <div className="border-r border-black dark:border-white sm:col-span-5">
          <LectureDetail />
          <CommentContainer
            comments={comments}
            setComments={setComments}
            lectureId={lectureId}
            getMoreComments={getCommentsByLectureId}
            page={page}
          />
        </div>
        <div className="sm:col-span-2">
          <LectureList isCourseDetailPage={false} />
        </div>
      </div>
    </main>
  );
};

export default LectureDetailPage;
