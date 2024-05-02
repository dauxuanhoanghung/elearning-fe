import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSnackbar } from "@/contexts/SnackbarContext";
import lectureService from "@/services/lecture.service";
import sectionService from "@/services/section.service";

const defaultLecture = {
  title: "",
  content: "",
  type: "VIDEO",
  orderIndex: "",
  description: "",
  duration: 0,
  section: 1,
  uploaderType: "YOUTUBE",
  ["videoFile"]: null,
};

const LectureForm = ({ courseData, setOpenLectureForm }) => {
  const { showSnackbar } = useSnackbar();
  // #region lectureData
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

  const createLectureForm = (lecture) => {
    const formData = new FormData();
    for (const key in lecture) {
      if (!lecture.hasOwnProperty(key)) continue;
      if (key === "videoFile" && videoInputRef.current.files[0]) {
        formData.append("videoFile", videoInputRef.current.files[0]);
        continue;
      }
      if (key === "section") {
        formData.append("section", parseInt(lecture[key]));
        continue;
      }

      formData.append(key, lecture[key]);
    }
    return formData;
  };

  const handleCreateLecture = async () => {
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

    const formData = createLectureForm(lectureFormData);

    const res = await lectureService.create(formData);

    console.log(res);

    if (videoInputRef.current) videoInputRef.current.value = null;
    setLectureFormData(defaultLecture);
  };
  // #endregion

  const { data: sections } = useQuery({
    queryKey: ["sections", { courseId: courseData.id }],
    queryFn: async () => {
      const res = await sectionService.getSections(courseData.id);
      if (res.data.length > 0) {
        setLectureFormData({
          ...lectureFormData,
          section: res.data[0].id,
          orderIndex: res.data[0].lectures.length + 1,
        });
      }
      return res.data.map((section) => ({
        id: section.id,
        name: section.name,
        lecturesCount: section.lectures.length,
      }));
    },
    initialData: [],
  });

  const handleSectionSelectChange = (value) => {
    setLectureFormData({
      ...lectureFormData,
      section: sections[value].id,
      orderIndex: sections[value].lecturesCount + 1,
    });
  };

  return (
    <main data-role="lecture-form">
      <h1 className="my-4 text-4xl">You're updating ({courseData.name})</h1>
      <form className="flex flex-col gap-2">
        <Select onValueChange={handleSectionSelectChange} defaultValue={1 + ""}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sections.map((section, idx) => (
              <SelectItem value={idx + ""} key={idx}>
                {section.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
            <Label>Lecture Type</Label>
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
          <div>
            <FormControl component="fieldset">
              <Label>Upload to</Label>
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
          </div>
        )}
        <div className="mt-2 block gap-4">
          <Button
            className="bg-black text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            type="button"
            onClick={handleCreateLecture}
          >
            Add Lecture and continue
          </Button>
          <Button
            className="ml-4 bg-black text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            type="button"
            onClick={() => setOpenLectureForm(false)}
          >
            Turn back
          </Button>
        </div>
      </form>
      {/* Include other lecture form inputs */}
    </main>
  );
};

export default LectureForm;
