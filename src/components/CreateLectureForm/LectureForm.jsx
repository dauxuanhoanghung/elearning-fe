import { Trash } from "lucide-react";
import React, { useRef, useState } from "react";

import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SectionCard from "./SectionCard";

const defaultLecture = {
  title: "",
  content: "",
  type: "VIDEO",
  orderIndex: "",
  description: "",
  duration: 0,
  uploaderType: "YOUTUBE",
  ["videoFile"]: null,
};

const SectionForm = ({ section, courseData, setCourseData }) => {
  const { showSnackbar } = useSnackbar();
  // #region lectureData
  const [lectures, setLectures] = useState(section?.lectures || []);
  const videoInputRef = useRef();
  // new lecture
  const [lectureFormData, setLectureFormData] = useState(defaultLecture);
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

  const addLecture = () => {
    if (
      !lectureFormData.title.trim() ||
      (lectureFormData.type === "VIDEO" && !videoInputRef?.current?.files[0])
    ) {
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
      description: lectureFormData.description,
      orderIndex: lectures.length + 1,
      duration: lectureFormData.duration,
    };
    if (videoInputRef.current?.files[0]) {
      newLecture.videoFile = videoInputRef.current.files[0];
    }

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

    setLectureFormData(defaultLecture);
    if (videoInputRef.current) videoInputRef.current.value = null;
  };

  const deleteLecture = (index) => {
    const updatedLectures = lectures.filter((_, i) => i !== index);
    const lecturesWithUpdatedIndexes = updatedLectures.map(
      (lecture, index) => ({ ...lecture, orderIndex: index + 1 }),
    );
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
              <div>
                <span className="font-bold">
                  {`${lecture.orderIndex}. ${lecture.title}`}
                </span>
                <SlowMotionVideoIcon />
              </div>
              <IconButton onClick={() => deleteLecture(index)}>
                <Trash />
              </IconButton>
              {/* Add more content or props as needed */}
            </CardContent>
          </Card>
        </React.Fragment>
      ))}
      {/* Render your lecture form inputs here */}
      <div className="flex flex-col gap-2">
        <div>
          <Label>Lecture Title</Label>
          <Input
            placeholder="Enter lecture title ..."
            className="w-full"
            name="title"
            value={lectureFormData.title}
            onChange={handleLectureChange}
          />
        </div>
        <div>
          <Label>Lecture Content</Label>
          <textarea
            rows={5}
            placeholder="Enter lecture content ..."
            className="w-full rounded-lg border bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900
              outline-none placeholder:text-gray-400 dark:bg-gray-700 dark:text-white "
            name="content"
            value={lectureFormData.content}
            onChange={handleLectureChange}
          />
        </div>
        <div>
          <Label>Description</Label>
          <textarea
            rows={5}
            placeholder="Enter Description ..."
            className="w-full rounded-lg border bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900
              outline-none placeholder:text-gray-400 dark:bg-gray-700 dark:text-white "
            name="description"
            value={lectureFormData.description}
            onChange={handleLectureChange}
          />
        </div>
        <div>
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
        </div>
        {lectureFormData.type === "VIDEO" && (
          <>
            <Grid item xs={12}>
              <FormControl component="fieldset">
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
                    label="Youtube"
                  />
                  <FormControlLabel
                    value="AMAZONS3"
                    control={<Radio />}
                    label="Amazon"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <div className="">
              <Label>Upload Video</Label>
              <input
                className="w-full"
                type="file"
                name="videoFile"
                accept="video/*"
                ref={videoInputRef}
              />
            </div>
          </>
        )}
        <div className="mt-2 block">
          <Button onClick={addLecture}>Add Lecture</Button>
        </div>
      </div>
      {/* Include other lecture form inputs */}
    </SectionCard>
  );
};

export default SectionForm;
