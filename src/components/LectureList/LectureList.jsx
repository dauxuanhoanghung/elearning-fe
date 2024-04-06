import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sectionService } from "@/services";
import LectureItem from "./LectureItem";

const LectureList = (props) => {
  const { courseId } = useParams();
  const { t } = useTranslation();
  const { isCourseDetailPage = false } = props;

  const {
    data: sections,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sections", "courseId", courseId],
    queryFn: async () => {
      const res = await sectionService.getSections(courseId);
      return res.data;
    },
  });

  console.log("Sections", sections);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching sections</div>;
  }

  return (
    <div className="mx-auto w-full">
      <Typography variant="h6">Course content:</Typography>
      <Accordion type="multiple" className="w-full">
        {sections.map((section, idx) => (
          <AccordionItem value={idx + ""} key={idx}>
            <AccordionTrigger>
              <span>
                {section.orderIndex}. {section.name}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                {section.lectures.map((lecture, index) => (
                  <React.Fragment key={lecture.id}>
                    <LectureItem
                      id={lecture.id}
                      orderIndex={lecture.orderIndex}
                      title={lecture.title}
                      type={lecture.type}
                      courseId={courseId}
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