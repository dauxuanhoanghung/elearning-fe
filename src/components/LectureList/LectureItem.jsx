import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import EditNoteIcon from "@mui/icons-material/EditNote";
/**
 *
 * @param {id, orderIndex, title, content, type, videos(id, video_url), courseId} props
 * @returns
 */
const LectureItem = (props) => {
  const { id, orderIndex, title, type, videos, courseId } = props;

  return (
    <>
      <Link
        to={`/course/${courseId}/learning?lectureId=${id}`}
        style={{ textDecoration: "none", color: "#000" }}
      >
        <Typography variant="h6" component="div">
          {orderIndex}. {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {type === "VIDEO" && (
            <>
              <SlowMotionVideoIcon />
            </>
          )}
          {type === "TEXT" && (
            <>
              <EditNoteIcon />
            </>
          )}
        </Typography>
      </Link>
    </>
  );
};

export default LectureItem;
