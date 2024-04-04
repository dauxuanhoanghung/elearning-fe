import React from "react";
import { Link } from "react-router-dom";

import EditNoteIcon from "@mui/icons-material/EditNote";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";

const LectureItem = (props) => {
  const { id, orderIndex, title, type, videos, courseId } = props;
  return (
    <>
      <Link
        to={`/course/${courseId}/learning?lectureId=${id}`}
        className="block w-full p-2 text-black no-underline"
      >
        <h6 className="text-lg font-bold">{`${orderIndex}. ${title}`}</h6>
        <div className="flex items-center">
          {type === "VIDEO" && <SlowMotionVideoIcon className="mr-1 h-6 w-6" />}
          {type === "TEXT" && <EditNoteIcon className="mr-1 h-6 w-6" />}
          <p className="text-sm">{type}</p>
        </div>
      </Link>
    </>
  );
};

export default LectureItem;
