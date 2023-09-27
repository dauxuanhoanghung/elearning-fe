import React, { useState, useEffect } from "react";
import LectureItem from "../LectureItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const LectureList = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // Fetch or set the sections data here, e.g., from an API call or props
    // For the sake of this example, we'll create sample data
    const sampleSections = [
      {
        id: 1,
        sectionName: "Section 1",
        lectures: [
          { id: 101, orderIndex: 1, title: "Lecture 1.1" },
          { id: 102, orderIndex: 2, title: "Lecture 1.2" },
        ],
      },
      {
        id: 2,
        sectionName: "Section 2",
        lectures: [
          { id: 201, orderIndex: 1, title: "Lecture 2.1" },
          { id: 202, orderIndex: 2, title: "Lecture 2.2" },
        ],
      },
    ];

    setSections(sampleSections);
  }, []);

  return (
    <div>
      {sections.map((section) => (
        <Accordion key={section.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {section.sectionName}
            </Typography>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", marginLeft: "auto" }}
            >
              Order Index: {section.orderIndex}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {section.lectures.map((lecture) => (
                <LectureItem
                  key={lecture.id}
                  id={lecture.id}
                  orderIndex={lecture.orderIndex}
                  title={lecture.title}
                  // Add more props as needed
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default LectureList;
