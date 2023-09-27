import { useEffect } from "react";
import SectionForm from "./SectionForm";
/**
 *
 * @param {sections, crtieria} props
 * @returns
 */
const CreateLectureForm = (props) => {
  const { courseData, setCourseData } = props;
  useEffect(() => {
    if (courseData.sections.length === 0) {
      setCourseData({
        ...courseData,
        sections: [
          {
            sectionName: "Get started",
            orderIndex: courseData.sections.length + 1,
          },
        ],
      });
    }
  }, [courseData, setCourseData]);

  return (
    <>
      {courseData.sections.length !== 0 &&
        courseData.sections.map((section, index) => (
          <>
            <SectionForm
              key={index}
              section={section}
              setCourseData={setCourseData}
              courseData={courseData}
            />
          </>
        ))}
    </>
  );
};

export default CreateLectureForm;
