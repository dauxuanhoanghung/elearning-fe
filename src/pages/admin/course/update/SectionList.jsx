import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Divider,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  List,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import LectureItem from "../../../../components/LectureList/LectureItem";
import { courseService } from "../../../../services";

const SectionList = (props) => {
  const {
    courseData,
    setCourseData,
    setOpenLectureForm,
    setSelectedSection,
    setSections,
    sections,
    fetchSectionsAndItsLectures 
  } = props;
  const { courseId } = useParams();
  // #region fetch init data
  useEffect(() => {
    fetchSectionsAndItsLectures();
  }, []);
  // #endregion

  const handleOpenAddLecture = (section) => {
    setOpenLectureForm(true);
    setSelectedSection(section);
  }
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
            {/* <LectureForm section={section} courseData={courseData} setCourseData={setCourseData} /> */}
            <Button onClick={() => { handleOpenAddLecture(section) }}>Add lecture</Button>
          </AccordionDetails>
        </Accordion>
      ))
      }
    </Box >
  );
}

export default SectionList;