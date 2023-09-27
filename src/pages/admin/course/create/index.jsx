import React, { useRef, useState } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import CreateCourseForm from "../../../../components/CreateCourseForm";
import CreateLectureForm from "../../../../components/CreateLectureForm";
import {
  Alert,
  Box,
  Button,
  Container,
  Slide,
  Snackbar,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";

const steps = ["Create Info Course", "Add Lecture"];
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
const CourseCreation = ({}) => {
  // #region Snackbar
  const [snackState, setSnackState] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleClose = () => {
    setSnackState(false);
  };
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
        setSnackState({ open: true, message: "Please enter full field", severity: "error"})
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
        setSnackState({ open: true, message: "Please enter full field", severity: "error"})
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
    background: null,
    price: "",
    description: "",
    criteria: [],
    sections: [],
  });
  const [showCreateLectureForm, setShowCreateLectureForm] = useState(false);

  const saveCourse = () => {
    // Handle saving the course data to your backend or storage here
    console.log("saveCourse >>>", courseData);
    setShowCreateLectureForm(true);
  };

  const handleFetchToSaveData = () => {
    console.log("handleFetchToSaveData >>>", courseData);
  };
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
                <Button onClick={handleNext} sx={{ mr: 1 }}>
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
      <Snackbar
        open={snackState.open}
        autoHideDuration={1000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackState.severity}
          sx={{ width: "100%" }}
        >
          {snackState.message}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
};

export default CourseCreation;
