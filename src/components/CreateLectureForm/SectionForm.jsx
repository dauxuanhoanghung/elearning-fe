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
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "../../contexts/SnackbarContext";

const SectionForm = ({ section, courseData, setCourseData }) => {
  // #region Snackbar
  const { showSnackbar } = useSnackbar();
  // #endregion
  // #region lectureData
  const [lectures, setLectures] = useState(section?.lectures || []);
  // new lecture  
  const [lectureFormData, setLectureFormData] = useState({
    title: "",
    content: "",
    type: "VIDEO",
    orderIndex: "",
    uploaderType: "YOUTUBE",
    videoFile: null,
  });
  const handleLectureChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setLectureFormData({ ...lectureFormData, [name]: files[0] });
    } else {
      setLectureFormData({ ...lectureFormData, [name]: value });
      if (name === "TEXT")
        setLectureFormData({ ...lectureFormData, ["videoFile"]: null });
    }
  };
  const addLecture = () => {
    if (!lectureFormData.title.trim() || (lectureFormData.type === "VIDEO" && !lectureFormData.videoFile)) {
      showSnackbar({
        message: "Please choose the file and fill the data",
        severity: "error",
      });
      return;
    }
    const newLecture = {
      title: lectureFormData.title,
      content: lectureFormData.content,
      type: lectureFormData.type,
      uploaderType: lectureFormData.uploaderType,
      orderIndex: lectures.length + 1,
      videoFile: lectureFormData.videoFile,
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
      videoFile: null,
    });
  };
  const deleteLecture = (index) => {
    const updatedLectures = lectures.filter((_, i) => i !== index);
    setLectures(updatedLectures);
    // Update the section's lectures in courseData
    const updatedSection = {
      ...section,
      lectures: updatedLectures,
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
        <>
          <Card key={index}>
            <CardContent>
              <Typography variant="h6" component="div">
                <span style={{ fontWeight: "bold" }}>
                  {lecture.orderIndex}:
                </span>{" "}
                {lecture.title}
              </Typography>
              <IconButton onClick={() => deleteLecture(index)}>
                <DeleteIcon />
              </IconButton>
              {/* Add more content or props as needed */}
            </CardContent>
          </Card>
        </>
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
                type="file"
                name="videoFile"
                accept="video/*"
                onChange={handleLectureChange}
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
