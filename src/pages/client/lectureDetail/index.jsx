import React, { useEffect, useState } from "react";
import { Typography, Box, Stack, Grid } from "@mui/material";
import Navbar from "../../../components/Navbar";
import LectureDetail from "../../../components/LectureDetail";
import Footer from "../../../components/Footer";
import CommentContainer from "../../../components/CommentContainer";
import LectureList from "../../../components/LectureList";
import lectureCommentService from "../../../services/lectureCommentService";
import { useSearchParams } from "react-router-dom";
import DefaultLayout from "../../../layout";

const LectureDetailPage = () => {
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
  return (
    <>
      <DefaultLayout>
        <Grid container sx={{ width: "90%", margin: "10px auto" }}>
          <Grid item xs={12} sm={9}>
            <LectureDetail />
            <CommentContainer
              comments={comments}
              setComments={setComments}
              lectureId={lectureId}
              getMoreComments={getCommentsByLectureId}
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
