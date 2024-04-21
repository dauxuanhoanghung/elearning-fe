import { Step, StepButton, Stepper } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateCourseForm from "@/components/CreateCourseForm";
import CreateLectureForm from "@/components/CreateLectureForm";
import { Spinner } from "@/components/common";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useSnackbar } from "@/contexts/SnackbarContext";
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
      if (
        courseData.name.trim() === "" ||
        courseData.price.toString().trim() === ""
      ) {
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
    // handleNext();
    setActiveStep(step);
  };

  const handleComplete = () => {
    if (activeStep === 0) {
      if (
        courseData.name.trim() === "" ||
        courseData.price.toString().trim() === ""
      ) {
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
    price: 0,
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
    <main data-component="Course Create Page" className="md:container">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create New Course</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {loading ? (
        <Spinner />
      ) : (
        <div className="my-4 md:container">
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
              <div>
                <p className="my-1.5">All steps completed - you're finished</p>
                <div className="flex pt-2">
                  <div className="flex-auto" />
                  <Button onClick={handleReset}>Reset</Button>
                  <Button onClick={handleFetchToSaveData}>Complete</Button>
                </div>
              </div>
            ) : (
              <section data-role="main-content">
                <p className="my-1.5">
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
                </p>
                <div className="flex justify-between pt-2 text-sm">
                  <div>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                  </div>
                  <div className="gap-1">
                    <Button
                      onClick={handleNext}
                      disabled={activeStep === steps.length - 1}
                    >
                      Next
                    </Button>
                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <p className="inline-block">
                          Step {activeStep + 1} already completed
                        </p>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? "Finish"
                            : "Complete Step"}
                        </Button>
                      ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default CourseCreationPage;
