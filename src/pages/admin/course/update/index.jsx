import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { UploadIcon } from "@/components/Icons";
import LectureList from "@/components/LectureList/LectureList";
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
import { Input } from "@/components/ui/input";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { courseService } from "@/services";
import { stringToFormatDate } from "@/utils/date-utils";
import { isAdmin } from "@/utils/utils";
import LectureForm from "./LectureForm";

const CourseUpdatePage = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const currentUser = useSelector((state) => state.user.user);

  // #region course detail
  /**
   * course {id, name, description, background(image), price(for button), creator, createdDate}
   */
  const [courseData, setCourseData] = useState({
    id: 0,
    name: "",
    description: "",
    background: "",
    price: 0,
    countRegistration: 1,
    user: {},
  });

  const { data, isLoading } = useQuery({
    queryKey: ["course", { id: courseId }],
    queryFn: async () => {
      const res = await courseService.getById(courseId);
      if (res.data) {
        setCourseData({ ...courseData, ...res.data });
        setBackgroundImageURL(res.data.background);
        return res.data;
      } else {
        showSnackbar({ message: "Course not found!!!", severity: "error" });
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
    console.log(courseData);
  };
  const handleUpdate = async () => {
    const formData = new FormData();
    if (inputRef.current.files[0]) {
      formData.append("backgroundFile", inputRef.current.files[0]);
    }
    for (const key in courseData) {
      console.log(key);
      if (!data.hasOwnProperty(key)) continue;
      if (key === "publishDate" && courseData[key] !== null) {
        formData.append(key, stringToFormatDate(courseData[key]));
        continue;
      }
      if (Array.isArray(courseData[key])) {
        const encodedArray = courseData[key].map(encodeURIComponent);
        formData.append(key, encodedArray.join(","));
        continue;
      }
      formData.append(key, courseData[key]);
    }
    const res = await courseService.update(formData);
    console.log(res);
    if (res.status) {
    }
  };
  // #endregion

  // #region image
  const [backgroundImageURL, setBackgroundImageURL] = useState("");
  const inputRef = useRef();
  const handleBackgroundImageUpload = (e) => {
    const backgroundImage = e.target.files[0];
    setCourseData({ ...courseData, backgroundFile: backgroundImage });
    setBackgroundImageURL(URL.createObjectURL(backgroundImage));
  };
  // #endregion

  const [openLectureForm, setOpenLectureForm] = useState(false);

  return (
    <main className="md:mx-auto md:max-w-[95%]" data-role="course-update-page">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {isAdmin(currentUser) && (
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Update Course</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-4 md:col-span-1">
          <LectureList isCourseDetailPage={true} />
        </div>
        {isLoading && <Spinner />}
        <div className="col-span-4 mb-6 md:col-span-3">
          <div data-role="create-lecture-form">
            {openLectureForm && (
              <LectureForm
                courseData={courseData}
                setOpenLectureForm={setOpenLectureForm}
              />
            )}
          </div>
          <div data-role="course-update-form">
            {!openLectureForm && (
              <div
                className="mt-4 grid grid-cols-1 gap-y-2"
                data-role="start-form"
              >
                <div className="w-full">
                  <label
                    htmlFor="background-image-upload"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden 
                  rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 
                  dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    {backgroundImageURL ? (
                      <img
                        src={backgroundImageURL}
                        className="w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pb-6 pt-5 text-gray-500 dark:text-gray-400">
                        <UploadIcon />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            {t("signup.click")}
                          </span>
                          {t("signup.dnd")}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t("signup.type")}
                        </p>
                      </div>
                    )}
                  </label>
                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    id="background-image-upload"
                    ref={inputRef} // Ref for the hidden file input
                    className="hidden"
                    onChange={handleBackgroundImageUpload}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Course Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your course name"
                    value={courseData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="subtitle"
                    className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <span>Subtitle</span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300/80">
                      (More detail of your course)
                    </span>
                  </label>
                  <Input
                    type="text"
                    name="subtitle"
                    id="subtitle"
                    placeholder="Enter your course subtitle"
                    value={courseData.subtitle}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                    Price
                  </label>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={courseData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={courseData.description}
                    onChange={handleInputChange}
                    name="description"
                    className="w-full rounded-lg border bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900
                    outline-none placeholder:text-gray-400 dark:bg-gray-700 dark:text-white "
                    placeholder="Example: This course will provide some information about some fields, ... It helps you improve your skills in ..."
                    required
                  ></textarea>
                </div>
                <div className="flex-start flex gap-4">
                  <Button className="dark:bg-gray-900" onClick={handleUpdate}>
                    Update
                  </Button>
                  <Button
                    className="dark:bg-gray-900"
                    onClick={() => setOpenLectureForm(true)}
                  >
                    Create a lecture
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseUpdatePage;
