import React, { useState, useEffect } from "react";
import LectureItem from "./LectureItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Divider,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  List,
} from "@mui/material";
import { courseService } from "../../services";
import { useParams } from "react-router-dom";

const LectureList = () => {
  const { courseId } = useParams();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSectionsAndItsLectures = async () => {
      const res = await courseService.getSectionAndLecturesByCourseId(courseId)
      console.log(res)
      if (res.data.status === 200) {
        setSections(res.data.data);
      }
    }

    const sampleSections = [
      {
        id: 1,
        sectionName: "Get-Started",
        orderIndex: 1,
        lectures: [
          { id: 101, orderIndex: 1, title: "Lecture 1.1" },
          { id: 102, orderIndex: 2, title: "Lecture 1.2" },
        ],
      },
      {
        id: 2,
        sectionName: "Section 2",
        orderIndex: 2,
        lectures: [
          { id: 201, orderIndex: 1, title: "Lecture 2.1" },
          { id: 202, orderIndex: 2, title: "Lecture 2.2" },
        ],
      },
    ];

    setSections(sampleSections);
    fetchSectionsAndItsLectures();
  }, []);

  return (
    <Box sx={{ width: "98%", marginLeft: "auto" }}>
      <Typography variant="h6">Course content:</Typography>
      {sections.map((section) => (
        <Accordion key={section.id} sx={{ margin: "0 !important" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ paddingY: "0px", cursor: "pointer", marginY: 0 }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {section.orderIndex}. {section.sectionName}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {section.lectures.map((lecture, index) => (
                <React.Fragment key={lecture.id}>
                  <LectureItem
                    id={lecture.id}
                    orderIndex={lecture.orderIndex}
                    title={lecture.title}
                    courseId={courseId}
                  />
                  {index < section.lectures.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default LectureList;
