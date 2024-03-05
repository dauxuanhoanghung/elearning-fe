import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Divider, Typography, List } from "@mui/material";

import { courseService } from "@/services";
import LectureItem from "./LectureItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LectureList = () => {
  const { courseId } = useParams();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSectionsAndItsLectures = async () => {
      const res = await courseService.getSectionAndLecturesByCourseId(courseId);
      console.log(res);
      if (res.data.status === 200) {
        setSections(res.data.data);
      }
    };
    fetchSectionsAndItsLectures();
  }, []);

  return (
    <Box sx={{ width: "98%", marginLeft: "auto" }}>
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
    </Box>
  );
};

export default LectureList;
