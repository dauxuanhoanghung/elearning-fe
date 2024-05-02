import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import CreateCourseForm from "@/components/CreateCourseForm";
import Spinner from "@/components/common/Spinner";
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
import { courseService } from "@/services";
import { stringToFormatDate } from "@/utils/date-utils";

const CourseCreationPage = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    name: "",
    backgroundFile: null,
    price: 0,
    subtitle: "",
    description: "",
    publishDate: new Date(),
    criteria: [],
    sections: [
      {
        name: "Get started",
        orderIndex: 1,
      },
    ],
  });
  // #region save Data
  const [loading, setLoading] = useState(false);
  const handleFetchToSaveData = async () => {
    const createFormData = (data) => {
      const formData = new FormData();
      for (const key in data) {
        if (!data.hasOwnProperty(key)) continue;
        if (key === "backgroundFile" && data[key] !== null) {
          formData.append(key, data[key]);
          continue;
        }
        if (key === "publishDate" && data[key] !== null) {
          formData.append(key, stringToFormatDate(data[key]));
          continue;
        }
        if (Array.isArray(data[key])) {
          const encodedArray = data[key].map(encodeURIComponent);
          formData.append(key, encodedArray.join(","));
          continue;
        }
        formData.append(key, data[key]);
      }
      return formData;
    };
    const createSectionFormData = (courseSections, courseId) => {
      let sections = [];
      courseSections.forEach((d) =>
        sections.push({
          name: d.name,
          orderIndex: d.orderIndex,
          course: courseId,
        }),
      );
      return sections;
    };
    console.log("handleFetchToSaveData >>>", courseData);

    setLoading(true);
    // 1. create course
    const request = createFormData(courseData);
    const courseRes = await courseService.create(request);

    if (courseRes.status !== 201) {
      showSnackbar({ message: "Something went wrong!!!", severity: "error" });
      return;
    }
    // 2. create section
    const sectionRequest = createSectionFormData(
      courseData.sections,
      courseRes.data?.id,
    );
    const sectionRes = await courseService.createSection(
      JSON.stringify({ sections: [...sectionRequest] }),
    );
    if (sectionRes?.status === 201) {
      navigate(`/course/${courseRes.data.id}/update`);
    } else {
      showSnackbar({ message: "Something went wrong!!!", severity: "error" });
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
      {loading && (
        <div className="relative">
          <div className="absolute flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        </div>
      )}
      <div className="my-4 md:container">
        <div>
          <section data-role="main-content">
            <div className="my-1.5">
              <CreateCourseForm
                courseData={courseData}
                setCourseData={setCourseData}
              />
            </div>
            <div className="flex flex-row-reverse justify-between pt-2 text-sm">
              <div className="gap-1">
                <Button
                  className="bg-black text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  onClick={handleFetchToSaveData}
                >
                  {t("Create now")}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default CourseCreationPage;
