import { useState } from "react";
import CourseContainer from "@/components/CourseContainer";
import DefaultLayout from "@/layout";

const Home = () => {
  //#region Blog
  const [blogs, setBlogs] = useState([]);
  //#endregion
  return (
    <>
      <DefaultLayout>
        <CourseContainer />
      </DefaultLayout>
    </>
  );
};

export default Home;
