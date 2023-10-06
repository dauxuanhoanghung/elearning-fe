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
                    type={lecture.type}
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
