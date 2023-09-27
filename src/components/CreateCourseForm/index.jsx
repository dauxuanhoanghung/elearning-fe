import React, { useRef, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Paper,
  IconButton,
  Card,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const CreateCourseForm = (props) => {
  const { courseData, setCourseData, saveCourse } = props;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };
  // #region image
  const [backgroundImageURL, setBackgroundImageURL] = useState("");
  const inputRef = useRef();
  const handleBackgroundImageUpload = (e) => {
    const backgroundImage = e.target.files[0];
    setCourseData({ ...courseData, background: backgroundImage });
    setBackgroundImageURL(URL.createObjectURL(backgroundImage));
  };
  // #endregion
  // #region criteria
  const addCriterion = () => {
    const criteria = [...courseData.criteria, ""];
    setCourseData({ ...courseData, criteria });
  };

  const handleCriteriaChange = (index, value) => {
    const criteria = [...courseData.criteria];
    criteria[index] = value;
    setCourseData({ ...courseData, criteria });
  };
  const handleDeleteCriteria = (index) => {
    const updatedCriteria = [...courseData.criteria];
    updatedCriteria.splice(index, 1);
    setCourseData({
      ...courseData,
      criteria: updatedCriteria,
    });
  };
  // #endregion
  // #region sections
  const addSection = () => {
    const sections = [...courseData.sections, { text: "", orderIndex: 0 }];
    setCourseData({ ...courseData, sections });
  };

  const handleSectionChange = (index, property, value) => {
    const sections = [...courseData.sections];
    sections[index][property] = value;
    setCourseData({ ...courseData, sections });
  };
  // #endregion
  return (
    <Box sx={{ margin: "10px auto", width: "90%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create a New Course
        </Typography>
      </div>
      <Grid item xs={12}>
        <label htmlFor="background-image-upload">
          <Paper
            elevation={3}
            style={{
              width: "100%",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            {backgroundImageURL ? (
              <>
                <img
                  src={backgroundImageURL}
                  alt="Background"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </>
            ) : (
              <div>
                <Typography variant="subtitle1">
                  Click to upload a background image
                  <IconButton>
                    <PhotoCameraIcon fontSize="large" />
                  </IconButton>
                </Typography>
              </div>
            )}
          </Paper>
        </label>
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          id="background-image-upload"
          ref={inputRef} // Ref for the hidden file input
          style={{ display: "none" }}
          onChange={handleBackgroundImageUpload}
        />
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            label="Course Name"
            name="name"
            value={courseData.name}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Price"
            name="price"
            value={courseData.price}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        {/* Criteria List */}
        <Typography justifyContent="center" variant="h5">
          List of Criteria
        </Typography>
        {courseData.criteria.map((criteria, index) => (
          <Grid
            item
            xs={12}
            key={index}
            sx={{
              margin: "3px auto",
              paddingTop: "5px",
              position: "relative",
            }}
          >
            <TextField
              label={`New criteria: Add here...`}
              value={criteria}
              onChange={(e) => handleCriteriaChange(index, e.target.value)}
              style={{ width: "100%" }}
            />
            <IconButton
              onClick={() => handleDeleteCriteria(index)}
              aria-label={`Delete criteria ${index + 1}`}
              sx={{
                position: "absolute",
                top: "50%",
                right: "5px",
                transform: "translate(-50%)",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="outlined" size="small" onClick={addCriterion}>
            <AddIcon />
            Add Criterion
          </Button>
        </Grid>
        {/* Sections List */}
        {courseData.sections.map((section, index) => (
          <Grid item xs={12} key={index} display="flex">
            <Card>
              <TextField
                label={`Section Text`}
                value={section.text}
                width="90%"
                onChange={(e) =>
                  handleSectionChange(index, "text", e.target.value)
                }
              />
              <TextField
                label={`Order Index`}
                type="number"
                value={section.orderIndex}
                width="10%"
                onChange={(e) =>
                  handleSectionChange(index, "orderIndex", e.target.value)
                }
              />
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="outlined" size="small" onClick={addSection}>
            <AddIcon />
            Add New Section
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Button variant="contained" color="primary" onClick={saveCourse}>
            Save Course
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateCourseForm;
