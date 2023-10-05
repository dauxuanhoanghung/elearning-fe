import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import LectureDetail from "../../../components/LectureDetail";
import CommentContainer from "../../../components/CommentContainer";
import LectureList from "../../../components/LectureList";
import { lectureCommentService } from "../../../services";
import { useNavigate, useSearchParams } from "react-router-dom";
import DefaultLayout from "../../../layout";
import { useSnackbar } from "../../../contexts/SnackbarContext";

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
      page
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
      navigate("/")
    }
  })
  return (
    <>
      <DefaultLayout>
        <Grid container>
          <Grid item xs={12} sm={9}>
            <LectureDetail />
            <CommentContainer
              comments={comments}
              setComments={setComments}
              lectureId={lectureId}
              getMoreComments={getCommentsByLectureId}
              page={page}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <LectureList />
          </Grid>
        </Grid>
      </DefaultLayout>
    </>
  );
};

export default LectureDetailPage;
