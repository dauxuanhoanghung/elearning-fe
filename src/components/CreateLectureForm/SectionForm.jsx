import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import SectionCard from "../SectionCard";
import React, { useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import { useSnackbar } from "../../contexts/SnackbarContext";

const SectionForm = ({ section, courseData, setCourseData }) => {
  const { showSnackbar } = useSnackbar();
  // #region lectureData
  const [lectures, setLectures] = useState(section?.lectures || []);
  const videoInputRef = useRef();
  // new lecture
  const [lectureFormData, setLectureFormData] = useState({
    title: "",
    content: "",
    type: "VIDEO",
    orderIndex: "",
    uploaderType: "YOUTUBE",
  });
  const handleLectureChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setLectureFormData({ ...lectureFormData, [name]: files[0] });
    } else {
      setLectureFormData({ ...lectureFormData, [name]: value });
      if (name === "TEXT") {
        setLectureFormData({ ...lectureFormData, ["videoFile"]: null });
        videoInputRef.current.value = null;
      }
    }
  };
  const addLecture = () => {
    console.log(videoInputRef?.current?.files[0])
    if (!lectureFormData.title.trim() ||
      (lectureFormData.type === "VIDEO" && !videoInputRef?.current?.files[0])) {
      showSnackbar({ message: "Please choose the file and fill the data", severity: "error" });
      return;
    }
    const newLecture = {
      title: lectureFormData.title,
      content: lectureFormData.content,
      type: lectureFormData.type,
      uploaderType: lectureFormData.uploaderType,
      orderIndex: lectures.length + 1,
      videoFile: videoInputRef.current.files[0],
    };
    const updatedLectures = [...lectures, newLecture];
    setLectures(updatedLectures);
    const updatedSection = { ...section, lectures: updatedLectures };
    const updatedSections = courseData.sections.map((sec) => {
      return sec.orderIndex === section.orderIndex ? updatedSection : sec;
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
      uploaderType: "YOUTUBE",
      ["videoFile"]: null,
    });
    videoInputRef.current.value = null;
  };
  const deleteLecture = (index) => {
    const updatedLectures = lectures.filter((_, i) => i !== index);
    const lecturesWithUpdatedIndexes = updatedLectures.map((lecture, index) => ({ ...lecture, orderIndex: index + 1 }));
    setLectures(lecturesWithUpdatedIndexes);
    // Update the section's lectures in courseData
    const updatedSection = {
      ...section,
      lectures: lecturesWithUpdatedIndexes,
    };

    const updatedSections = courseData.sections.map((sec) => {
      return sec.id === section.id ? updatedSection : sec;
    });

    setCourseData({ ...courseData, sections: updatedSections });
  };
  // #endregion
  return (
    <SectionCard
      orderIndex={section.orderIndex}
      sectionName={section.sectionName}
    >
      {lectures.map((lecture, index) => (
        <React.Fragment key={index}>
          <Card>
            <CardContent sx={{ display: "flex" }}>
              <Typography variant="h6" component="div">
                <span style={{ fontWeight: "bold" }}>
                  {`${lecture.orderIndex}. ${lecture.title}`}
                </span>
                <SlowMotionVideoIcon />
              </Typography>
              <IconButton onClick={() => deleteLecture(index)}>
                <DeleteIcon />
              </IconButton>
              {/* Add more content or props as needed */}
            </CardContent>
          </Card>
        </React.Fragment>
      ))}
      {/* Render your lecture form inputs here */}
      <Grid container spacing={1}>
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
              row
              name="type"
              value={lectureFormData.type}
              onChange={handleLectureChange}
            >
              <FormControlLabel
                value="VIDEO"
                control={<Radio />}
                label="Video"
              />
              <FormControlLabel value="TEXT" control={<Radio />} label="Text" />
            </RadioGroup>
          </FormControl>
        </Grid>
        {lectureFormData.type === "VIDEO" && (
          <>
            <Grid item xs={12}>
              <FormControl component="fieldset" >
                <FormLabel component="legend">Upload to</FormLabel>
                <RadioGroup
                  row
                  name="uploaderType"
                  value={lectureFormData.uploaderType}
                  onChange={handleLectureChange}
                >
                  <FormControlLabel
                    value="YOUTUBE"
                    control={<Radio />}
                    label="Youtube" />
                  <FormControlLabel
                    value="AMAZONS3"
                    control={<Radio />}
                    label="Amazon" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Upload Video</InputLabel>
              <input
                fullWidth
                type="file"
                name="videoFile"
                accept="video/*"
                ref={videoInputRef}

              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={addLecture}>
            Add Lecture
          </Button>
        </Grid>
      </Grid>
      {/* Include other lecture form inputs */}
    </SectionCard>
  );
};

export default SectionForm;
