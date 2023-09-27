import React, { useRef, useState } from "react";

import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";

import CreateCourseForm from "../../../../components/CreateCourseForm";

const CourseCreation = ({}) => {
  const [courseData, setCourseData] = useState({
    name: "",
    background: null,
    price: "",
    description: "",
    criteria: [],
    sections: [],
  });

  const saveCourse = () => {
    // Handle saving the course data to your backend or storage here
    console.log("saveCourse >>>", courseData);
  };

  return (
    <>
      <Navbar />
      <CreateCourseForm
        courseData={courseData}
        setCourseData={setCourseData}
        saveCourse={saveCourse}
      />
      <Footer />
    </>
  );
};

export default CourseCreation;
