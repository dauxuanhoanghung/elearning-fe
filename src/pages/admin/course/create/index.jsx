import {
  Box,
  Button,
  Container,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateCourseForm from "@/components/CreateCourseForm";
import CreateLectureForm from "@/components/CreateLectureForm";
import { Spinner } from "@/components/common";
import { useSnackbar } from "@/contexts/SnackbarContext";
import DefaultLayout from "@/layout";
import { courseService, lectureService } from "@/services";

const steps = ["Create Info Course", "Add Lecture"];

const CourseCreationPage = ({}) => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
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
      } else if (parseFloat(courseData.price) < 0) {
        showSnackbar({
          message: "Course price must be equal or greater than 0",
          severity: "error",
        });
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
        showSnackbar({ message: "Please enter full field", severity: "error" });
        return;
      } else if (parseFloat(courseData.price) < 0) {
        showSnackbar({
          message: "Course price must be equal or greater than 0",
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
    price: "0",
    description: "",
    criteria: [],
    sections: [],
  });
  // #region save Data
  const [loading, setLoading] = useState(false);
  const handleFetchToSaveData = async () => {
    const createFormData = (data) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("backgroundFile", data.backgroundFile);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("criteria", data.criteria);
      return formData;
    };
    const createSectionFormData = (courseSections, courseId) => {
      let sections = [];
      courseSections.forEach((d) =>
        sections.push({
          sectionName: d.sectionName,
          orderIndex: d.orderIndex,
          course: courseId,
        }),
      );
      return sections;
    };
    const createLectureForm = (lecture, sectionId) => {
      const formData = new FormData();
      formData.append("title", lecture.title);
      formData.append("content", lecture.content);
      formData.append("type", lecture.type);
      formData.append("uploaderType", lecture.uploaderType);
      formData.append("orderIndex", lecture.orderIndex);
      formData.append("videoFile", lecture.videoFile);
      formData.append("section", sectionId);
      return formData;
    };
    console.log("handleFetchToSaveData >>>", courseData);

    setLoading(true);
    // 1. create course
    const request = createFormData(courseData);
    const courseRes = await courseService.create(request);
    console.log(courseRes.data.data);
    if (courseRes.data.status === 201) {
      // 2. create section
      const sectionRequest = createSectionFormData(
        courseData.sections,
        courseRes?.data?.data.id,
      );
      const sectionRes = await courseService.createSection(
        JSON.stringify({ sections: [...sectionRequest] }),
      );
      const sectionsResult = sectionRes.data.data;
      let finalRes = null;
      // 3. create lecture
      courseData.sections.forEach(async (section) => {
        sectionsResult.forEach((resultSection) => {
          if (section.orderIndex === resultSection.orderIndex) {
            section.lectures?.forEach(async (lecture) => {
              const lectureRequest = createLectureForm(
                lecture,
                resultSection.id,
              );
              finalRes = await lectureService.create(lectureRequest);
            });
          }
        });
      });
      if (finalRes?.data?.status === 201) {
        navigate("/");
      } else {
        showSnackbar({ message: "Something went wrong!!!", severity: "error" });
      }
    }

    // setLoading(false);
  };
  // #endregion

  return (
    <>
      <DefaultLayout>
        {loading ? (
          <Spinner />
        ) : (
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
        )}
      </DefaultLayout>
    </>
  );
};

export default CourseCreationPage;
