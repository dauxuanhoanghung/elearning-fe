import React from "react";
import { Link } from "react-router-dom";

import { secondsToTime } from "@/utils/utils";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";

interface LectureItemProps {
  id: number;
  orderIndex: number;
  title: string;
  type: string;
  courseId: number;
  isCourseDetailPage: boolean;
  duration: number;
}

const LectureItem: React.FC<LectureItemProps> = (props) => {
  const {
    id,
    orderIndex,
    title,
    type,
    courseId,
    isCourseDetailPage,
    duration,
  } = props;
  const Element = isCourseDetailPage ? "div" : Link;

  return (
    <li>
      <Element
        to={`/course/${courseId}/learning?lectureId=${id}`}
        className="block w-full p-2 text-black no-underline dark:text-gray-100"
      >
        <h6 className="flex justify-between text-lg">
          <span className="font-bold">{`${orderIndex}. ${title}`}</span>
          <span className="text-sm font-medium">{secondsToTime(duration)}</span>
        </h6>
        <div className="flex items-center">
          {type === "VIDEO" && <SlowMotionVideoIcon className="mr-1 h-6 w-6" />}
          {type === "TEXT" && <EditNoteIcon className="mr-1 h-6 w-6" />}
          <p className="text-sm">{type}</p>
        </div>
      </Element>
    </li>
  );
};

export default LectureItem;
