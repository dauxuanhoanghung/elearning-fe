import { secondsToTime } from "@/utils/utils";
import { StepForward } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface ContinueLectureCardProps {
  id?: number;
  lecture: any;
  course: any;
}

const ContinueLectureCard: React.FC<ContinueLectureCardProps> = (props) => {
  const { lecture, course } = props;
  const generateUrl = () => {
    return `/course/${course.id}/learning?lectureId=${lecture.id}`;
  };

  return (
    <Link
      data-component="continue-lecture-card"
      to={generateUrl()}
      className="flex min-h-[200px] w-full cursor-pointer border border-gray-500 bg-gray-100 text-black transition-all hover:bg-gray-200/70 dark:bg-gray-700/80 dark:text-white dark:hover:bg-gray-800/80"
    >
      <div className="relative w-2/5 overflow-hidden ">
        <img
          className="h-full max-h-[200px] w-auto object-cover transition-all duration-300 hover:scale-125"
          src={course?.background || ""}
        />
        <div className="pointer-events-none absolute left-0 top-0 z-50 h-full w-full bg-gray-700/40">
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white">
            <StepForward className="h-6 w-6 text-black" />
          </div>
        </div>
      </div>
      <div className="flex w-3/5 flex-col justify-between p-4">
        <div>
          <p className="font-semibold text-gray-500">{`${lecture?.orderIndex}. ${lecture?.content}`}</p>
          <p className="text-lg font-bold">{course?.name}</p>
        </div>
        <p className="text-sm">
          <span className="text-base font-semibold">{lecture?.type} •</span>{" "}
          {secondsToTime(lecture?.duration || 0)}
        </p>
      </div>
    </Link>
  );
};

export default ContinueLectureCard;
