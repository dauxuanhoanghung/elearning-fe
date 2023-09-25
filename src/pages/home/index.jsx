import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";
import CourseCard from "../../components/CourseCard";
import CourseContainer from "../../components/CourseContainer";
import { Box } from "@mui/material";

const Home = () => {
  //#region Blog
  const [blogs, setBlogs] = useState([]);
  //#endregion
  return (
    <>
      <Navbar />
      <Box sx={{ width: "90%", marginX: "auto", marginY: "10px" }}>
        <CourseContainer />
      </Box>
      <Footer />
    </>
  );
};

export default Home;
