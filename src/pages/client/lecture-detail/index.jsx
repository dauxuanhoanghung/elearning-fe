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
    if (res.data.data.length > 0) {
      setComments([...comments, ...res.data.data]);
      setPage(page + 1);
    } else setPage(-1);
  };
  useEffect(() => {
    getCommentsByLectureId(lectureId);
  }, []);
  // #endregion
  const [searchParams] = useSearchParams();
  const lectureId = searchParams.get("lectureId");
  useEffect(() => {
    if (!lectureId) {
      showSnackbar({ message: "Invalid route", severity: "error" });
      navigate("/");
    }
  });

  return (
    <main data-component="lecture-detail-page">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <LectureDetail />
          <CommentContainer
            comments={comments}
            setComments={setComments}
            lectureId={lectureId}
            getMoreComments={getCommentsByLectureId}
            page={page}
          />
        </div>
        <div className="sm:col-span-1">
          <LectureList />
        </div>
      </div>
    </main>
  );
};

export default LectureDetailPage;
