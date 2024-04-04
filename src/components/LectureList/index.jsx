import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Divider, List, Typography } from "@mui/material";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { courseService } from "@/services";
import LectureItem from "./LectureItem";

const LectureList = () => {
  const { courseId } = useParams();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSectionsAndItsLectures = async () => {
      const res = await courseService.getSectionAndLecturesByCourseId(courseId);
      if (res.data.status === 200) {
        setSections(res.data.data);
      }
    };
    fetchSectionsAndItsLectures();
  }, []);

  return (
    <div className="mx-auto w-full">
      <Typography variant="h6">Course content:</Typography>
      <Accordion type="multiple">
        {sections.map((section, idx) => (
          <AccordionItem value="item-1" key={idx}>
            <AccordionTrigger>
              {section.orderIndex}. {section.sectionName}
            </AccordionTrigger>
            <AccordionContent>
              <List>
                {section.lectures.map((lecture, index) => (
                  <React.Fragment key={lecture.id}>
                    <LectureItem
                      id={lecture.id}
                      orderIndex={lecture.orderIndex}
                      title={lecture.title}
                      type={lecture.type}
                      courseId={courseId}
                    />
                    {index < section.lectures.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default LectureList;
