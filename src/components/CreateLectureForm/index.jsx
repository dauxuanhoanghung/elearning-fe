import { useEffect, useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Grid,
  InputLabel,
  Typography,
  Collapse,
} from "@mui/material";
import SectionCard from "../SectionCard";
/**
 *
 * @param {sections, crtieria} props
 * @returns
 */
const CreateLectureForm = (props) => {
  const { courseData, setCourseData } = props;
  useEffect(() => {
    if (courseData.sections.length === 0) {
      setCourseData({
        ...courseData,
        sections: [
          {
            sectionName: "Get started",
            orderIndex: courseData.sections.length + 1,
          },
        ],
      });
    }
  }, [courseData, setCourseData]);
  const [lectureFormData, setLectureFormData] = useState({
    title: "",
    content: "",
    type: "VIDEO",
    orderIndex: "",
    videoFile: null,
  });

  // Function to handle changes in lecture form fields
  const handleLectureChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setLectureFormData({ ...lectureFormData, [name]: files[0] });
    } else {
      setLectureFormData({ ...lectureFormData, [name]: value });
    }
  };

  // Function to add a new lecture to the sections list
  const addLecture = () => {
    const newLecture = {
      title: lectureFormData.title,
      content: lectureFormData.content,
      type: lectureFormData.type,
      orderIndex: lectureFormData.orderIndex,
      videoFile: lectureFormData.videoFile,
    };
    const updatedSections = courseData.sections.map((section) => {
      if (section.id === selectedSectionId) {
        return {
          ...section,
          lectures: [...section.lectures, newLecture],
        };
      }
      return section;
    });

    setCourseData({
      ...courseData,
      sections: updatedSections,
    });

    setLectureFormData({
      title: "",
      content: "",
      type: "VIDEO",
      orderIndex: "",
      videoFile: null,
    });
  };

  return (
    <>
      {courseData.sections.length !== 0 &&
        courseData.sections.map((section, index) => (
          <>
            <SectionCard orderIndex={section.orderIndex} sectionName={section.sectionName}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Lecture Title"
                    name="title"
                    value={lectureFormData.title}
                    onChange={handleLectureChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Lecture Content"
                    name="content"
                    label="Description"
                    value={lectureFormData.content}
                    fullWidth
                    multiline
                    rows={4}
                    onChange={handleLectureChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Lecture Type</FormLabel>
                    <RadioGroup
                      name="type"
                      value={lectureFormData.type}
                      onChange={handleLectureChange}
                    >
                      <FormControlLabel
                        value="VIDEO"
                        control={<Radio />}
                        label="Video"
                      />
                      <FormControlLabel
                        value="TEXT"
                        control={<Radio />}
                        label="Text"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {lectureFormData.type === "VIDEO" && (
                  <Grid item xs={12}>
                    <InputLabel>Upload Video</InputLabel>
                    <input
                      type="file"
                      name="videoFile"
                      accept="video/*"
                      onChange={handleLectureChange}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addLecture}
                  >
                    Add Lecture
                  </Button>
                </Grid>
              </Grid>
            </SectionCard>
          </>
        ))}
    </>
  );
};

export default CreateLectureForm;
