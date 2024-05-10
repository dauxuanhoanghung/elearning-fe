import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sectionService } from "@/services";
import LectureItem from "./LectureItem";

const LectureList: React.FC<{ isCourseDetailPage: boolean }> = (props) => {
  const { courseId } = useParams();
  const { t } = useTranslation();
  const { isCourseDetailPage = false } = props;

  const {
    data: sections,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sections", { courseId }],
    queryFn: async () => {
      const res = await sectionService.getSections(parseInt(courseId));
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching sections</div>;

  return (
    <div className="mx-auto w-full">
      <h2 className="text-3xl">{t("lecture-list.course-content")}</h2>
      <Accordion type="multiple" className="w-full">
        {sections.map((section, idx: number) => (
          <AccordionItem value={idx + ""} key={idx}>
            <AccordionTrigger>
              <div className="flex w-full">
                {section.orderIndex}. {section.name}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                {section.lectures
                  .sort((a, b) => a.orderIndex - b.orderIndex)
                  .map((lecture, index) => (
                    <React.Fragment key={lecture.id}>
                      <LectureItem
                        id={lecture.id}
                        orderIndex={lecture.orderIndex}
                        title={lecture.title}
                        type={lecture.type}
                        courseId={parseInt(courseId)}
                        duration={lecture.duration}
                        isCourseDetailPage={isCourseDetailPage}
                      />
                      {index < section.lectures.length - 1 && (
                        <li className="block h-[0.5px] w-full bg-gray-500 dark:bg-gray-300"></li>
                      )}
                    </React.Fragment>
                  ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default LectureList;
