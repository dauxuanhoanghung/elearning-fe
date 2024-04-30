import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import CommentContainer from "@/components/CommentContainer";
import LectureDetail from "@/components/LectureDetail";
import FaceDetectionCamera from "@/components/LectureDetail/FaceDetectCamera";
import LectureList from "@/components/LectureList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { lectureCommentService } from "@/services";

const LectureDetailPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const timerRef = useRef(null);
  const [searchParams] = useSearchParams();
  const lectureId = searchParams.get("lectureId");

  // #region player state
  const [playerState, setPlayerState] = useState({
    playing: true,
    volume: 1,
    muted: false,
  });
  // #endregion

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
    window.scrollTo(0, 140); // Scroll to the top of the page
  }, [location.pathname]);

  return (
    <main data-component="lecture-detail-page" className="">
      <div className="grid grid-cols-1 sm:grid-cols-7">
        <div className="border-r border-black dark:border-white sm:col-span-5">
          <LectureDetail
            playerState={playerState}
            setPlayerState={setPlayerState}
          />
          <CommentContainer
            comments={comments}
            setComments={setComments}
            lectureId={lectureId}
            getMoreComments={getCommentsByLectureId}
            page={page}
          />
        </div>
        <div className="sm:col-span-2">
          <ScrollArea className="h-[70vh]">
            <LectureList isCourseDetailPage={false} />
          </ScrollArea>
          <div>
            <FaceDetectionCamera
              setPlayerState={setPlayerState}
              ref={timerRef}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LectureDetailPage;
