import React from "react";
import { Box, Typography } from "@mui/material";
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
        style={{ textDecoration: "none", color: "#000", padding: "2px" }}
      >
        <Typography variant="h6" component="div">
          {`${orderIndex}. ${title}`}
        </Typography>
        <Box sx={{ display: "flex" }}>
          {type === "VIDEO" && (<>
            <SlowMotionVideoIcon />
            <Typography variant="body2">{type}</Typography>
          </>
          )}
          {type === "TEXT" && (
            <>
              <EditNoteIcon />
              <Typography>{type}</Typography>
            </>
          )}
        </Box>
      </Link>
    </>
  );
};

export default LectureItem;
