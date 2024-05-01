import { format } from "date-fns";
import { CalendarIcon, Home, Plus, Trash } from "lucide-react";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { UploadIcon } from "@/components/Icons";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const CreateCourseForm = (props) => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();

  const { courseData, setCourseData, saveCourse } = props;
  const navigate = useNavigate();
  const handleReturnHome = () => {
    navigate("/");
  };

  const [date, setDate] = useState(new Date());

  const handleSetDate = (value) => {
    setDate(value);
    setCourseData((prev) => ({
      ...prev,
      publishDate: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      if (value < 0) {
        showSnackbar({
          message: "Price cannot be negative",
          severity: "error",
        });
        return;
      }
    }
    setCourseData({ ...courseData, [name]: value });
  };
  // #region image
  const [backgroundImageURL, setBackgroundImageURL] = useState("");
  const inputRef = useRef();
  const handleBackgroundImageUpload = (e) => {
    const backgroundImage = e.target.files[0];
    setCourseData({ ...courseData, backgroundFile: backgroundImage });
    setBackgroundImageURL(URL.createObjectURL(backgroundImage));
  };
  // #endregion

  // #region criteria
  const addCriterion = () => {
    const criteria = [...courseData.criteria, ""];
    setCourseData((prev) => ({ ...prev, criteria }));
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
    const sections = [
      ...courseData.sections,
      { sectionName: "", orderIndex: courseData.sections.length + 1 },
    ];
    setCourseData({ ...courseData, sections });
  };

  const handleSectionChange = (index, property, value) => {
    const sections = [...courseData.sections];
    sections[index][property] = value;
    setCourseData({ ...courseData, sections });
  };
  const handleDeleteSection = (index) => {
    const updatedSections = [...courseData.sections];
    updatedSections.splice(index, 1);
    updatedSections.forEach((s, i) => (s["orderIndex"] = i + 1));
    setCourseData({
      ...courseData,
      sections: updatedSections,
    });
  };
  // #endregion
  return (
    <div className="w-9/10 mx-auto">
      <button
        onClick={handleReturnHome}
        className="flex items-end space-x-2 border-none bg-transparent p-2 px-4 hover:bg-gray-100 focus:outline-none 
        focus:ring-2 focus:ring-indigo-500 hover:dark:bg-gray-900"
      >
        <Home />
        <span className="text-lg leading-6">Return to Home Page</span>
      </button>

      <div className="flex items-center justify-center">
        <h4 className="m-4 text-4xl">Create a New Course</h4>
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300/80">
        The following descriptions will be publicly visible on your Course
        Dashboard and will directly impact course performance and help students
        decide if the course is right for them.
      </div>

      <form className="mt-4 grid grid-cols-2 gap-y-2" data-role="start-form">
        <div className="col-span-2 w-full">
          <label
            htmlFor="background-image-upload"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden 
                  rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 
                  dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {backgroundImageURL ? (
              <img src={backgroundImageURL} className="w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center pb-6 pt-5 text-gray-500 dark:text-gray-400">
                <UploadIcon />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">{t("signup.click")}</span>
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
        <div className="col-span-2 w-full">
          <Label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Course Name
          </Label>
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
        <div className="col-span-2 w-full">
          <Label
            htmlFor="subtitle"
            className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
          >
            <span>Subtitle</span>
            <span className="ml-2 text-gray-700 dark:text-gray-300/80">
              (More detail of your course)
            </span>
          </Label>
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
        <div className="col-span-1 w-full">
          <Label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
            <span>Price</span>
            <span className="ml-2 text-gray-700 dark:text-gray-300/80">
              (Decide to the end students will pay for this course)
            </span>
          </Label>
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
        <div className="col-span-1 w-full">
          <Label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
            <span>Publish Date</span>
            <span className="ml-2 text-gray-700 dark:text-gray-300/80">
              (Decide when your course ready to publish to the user)
            </span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:bg-gray-700 sm:text-sm",
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleSetDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="col-span-2 w-full">
          <Label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
            Description
          </Label>
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
        {/* Criteria List */}
        <div className="col-span-2 my-1">
          <h5 className="text-2xl font-semibold">List of Criteria</h5>
          <div className="text-sm text-gray-700 dark:text-gray-300/80">
            List of the required skills, experience, tools or equipment learners
            should have prior to taking your course.
          </div>
          <div className="w-full" data-role="list-criteria">
            {courseData.criteria.map((criteria, index) => (
              <div key={index} className="relative mx-auto my-1 pt-1">
                <Input
                  placeholder="Example: Require a basic knowledge of ...."
                  value={criteria}
                  onChange={(e) => handleCriteriaChange(index, e.target.value)}
                  className="w-full"
                />
                <button
                  onClick={() => handleDeleteCriteria(index)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-2 rounded bg-gray-600 px-3 py-1 text-base text-white outline-1 transition-all duration-300 hover:bg-gray-800 dark:bg-gray-500 dark:hover:bg-gray-100 dark:hover:text-black"
            onClick={addCriterion}
          >
            <Plus />
            <span>Add Criterion</span>
          </button>
        </div>
        {/* Sections List */}
        <div className="col-span-2 my-1">
          <h5 className="text-2xl font-semibold"> List of Sections</h5>
          <div className="text-sm text-gray-700 dark:text-gray-300/80">
            List of the content you want your course to have. It may be updated
            later.
          </div>
          <div className="w-full" data-role="list-Sections">
            {courseData.sections.map((section, index) => (
              <div key={index} className="relative mx-auto my-1 w-full pt-1">
                <label className="flex w-full items-center gap-2">
                  <span className="block text-nowrap">
                    {"Section " + section.orderIndex}
                  </span>
                  <div className="w-full">
                    <Input
                      placeholder="Section Text"
                      value={section.name}
                      className="w-full"
                      onChange={(e) =>
                        handleSectionChange(index, "name", e.target.value)
                      }
                      required
                    />
                    <button
                      onClick={() => handleDeleteSection(index)}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-2 rounded bg-gray-600 px-3 py-1 text-base text-white outline-1 transition-all duration-300 hover:bg-gray-800 dark:bg-gray-500 dark:hover:bg-gray-100 dark:hover:text-black"
            onClick={addSection}
          >
            <Plus />
            <span>Add New Section</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourseForm;
