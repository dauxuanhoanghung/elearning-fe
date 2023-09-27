import React, { useRef, useState } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import CreateCourseForm from "../../../../components/CreateCourseForm";
import CreateLectureForm from "../../../../components/CreateLectureForm";
import {
  Box,
  Button,
  Container,
  Slide,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { useSnackbar } from "../../../../contexts/SnackbarContext";
import courseService from "../../../../services/courseService";
import Spinner from "../../../../components/Spinner";
import { useNavigate } from "react-router-dom";
const steps = ["Create Info Course", "Add Lecture"];
const CourseCreation = ({}) => {
  // #region Snackbar
  const { showSnackbar } = useSnackbar();
  // #endregion
  // #region Stepper
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleNext = () => {
    if (activeStep === 0) {
      if (courseData.name.trim() === "" || courseData.price.trim() === "") {
        showSnackbar({ message: "Please enter full field", severity: "error" });
        return;
      }
    }
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    if (activeStep === 0) {
      if (courseData.name.trim() === "" || courseData.price.trim() === "") {
        setSnackState({
          open: true,
          message: "Please enter full field",
          severity: "error",
        });
        return;
      }
    }
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  // #endregion
  const [courseData, setCourseData] = useState({
    name: "",
    backgroundFile: null,
    price: "",
    description: "",
    criteria: [],
    sections: [],
  });
  const navigate = useNavigate();
  const handleFetchToSaveData = async () => {
    const createFormData = (data) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("backgroundFile", data.backgroundFile);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("criteria", JSON.stringify(data.criteria));
      data.sections.forEach((section, sectionIndex) => {
        const sectionFormData = new FormData();
        sectionFormData.append("sectionName", section.sectionName);
        sectionFormData.append("orderIndex", section.orderIndex);
        section.lectures.forEach((lecture, index) => {
          const lectureFormData = new FormData();
          lectureFormData.append("title", lecture.title);
          lectureFormData.append("content", lecture.content);
          lectureFormData.append("type", lecture.type);
          lectureFormData.append("orderIndex", lecture.orderIndex);
          lectureFormData.append("videoFile", lecture.videoFile);
          sectionFormData.append("lectures", lectureFormData);
        });
        formData.append("sections", sectionFormData);
      });
      return formData;
    };
    console.log("handleFetchToSaveData >>>", courseData);
    // setLoading(true);
    const request = createFormData(courseData);
    const courseRes = await courseService.create(request);
    // const sectionRes = await 
    // if (res.status === "201") {
    //   navigate("/");
    // }
    // setLoading(false);
  };

  const [loading, setLoading] = useState(false);
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <Navbar />
      <Container sx={{ marginY: "20px", minHeight: "500px" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <div>
          {allStepsCompleted() ? (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you're finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
                <Button onClick={handleFetchToSaveData}>Complete</Button>
              </Box>
            </>
          ) : (
            <>
              <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                {activeStep === 0 && (
                  <CreateCourseForm
                    courseData={courseData}
                    setCourseData={setCourseData}
                  />
                )}
                {activeStep === 1 && (
                  <CreateLectureForm
                    courseData={courseData}
                    setCourseData={setCourseData}
                  />
                )}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  onClick={handleNext}
                  disabled={activeStep === steps.length - 1}
                  sx={{ mr: 1 }}
                >
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block" }}
                    >
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                  ))}
              </Box>
            </>
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default CourseCreation;
