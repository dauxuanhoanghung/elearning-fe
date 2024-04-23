import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import lastLectureService from "@/services/last.lecture.service";
import { isEmptyObject } from "@/utils/utils";
import ContinueLectureCard from "./ContinueLectureCard";

const LastLecturesContainer = () => {
  const currentUser = useSelector((state) => state.user.user);
  const { t } = useTranslation();
  const { data: lastLectures, isLoading: isLastLecturesLoading } = useQuery({
    queryKey: ["lastLectures"],
    queryFn: async () => {
      if (isEmptyObject(currentUser)) return Promise.resolve([]);
      const res = await lastLectureService.getList();
      return res.data;
    },
    initialData: [],
    onerror: () => {
      console.log("Error fetching lastLectures");
    },
  });

  return (
    <div data-component="course-container">
      <h1 className="my-4 text-3xl">{t("home.last-lectures")}</h1>
      <div className="flex gap-x-4">
        {lastLectures.map((item, index) => (
          <ContinueLectureCard key={index} {...item} />
        ))}
      </div>
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
