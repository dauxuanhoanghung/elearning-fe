import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { RootState } from "@/app/store";
import lastLectureService from "@/services/last.lecture.service";
import { LoaderIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import ContinueLectureCard from "./ContinueLectureCard";

const LastLecturesContainer: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const { t } = useTranslation();
  const { data: lastLectures, isLoading: isLastLecturesLoading } = useQuery({
    queryKey: ["lastLectures"],
    queryFn: async () => {
      const res = await lastLectureService.getList();
      return res.data;
    },
    initialData: [],
  });

  return (
    <div
      className="relative"
      data-component="last-lecture-container min-h-[250px]"
    >
      {isLastLecturesLoading && (
        <div className="absolute z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <LoaderIcon
            className={twMerge("animate-spin text-black dark:text-white")}
            size={48}
          />
        </div>
      )}
      {lastLectures.length > 0 && (
        <>
          <h1 className="my-4 text-3xl">{t("home.last-lectures")}</h1>
          <div className="grid grid-cols-4 gap-x-4">
            {lastLectures.map((item, index: number) => (
              <ContinueLectureCard key={index} {...item} />
            ))}
          </div>
        </>
      )}
      {lastLectures.length === 0 && (
        <article>
          <h1 className="my-4 text-4xl">
            Let's get started, {currentUser.firstName} {currentUser.lastName}
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300">
            Go to choose your expected course and learn right now!!!!
          </p>
        </article>
      )}
    </div>
  );
};

export default function LastLecturesContainerBoundary() {
  return (
    <ErrorBoundary fallback={<p></p>}>
      <LastLecturesContainer />
    </ErrorBoundary>
  );
}
