import { Box } from "@mui/material";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CourseContainer from "../../components/CourseContainer";

const FavoritePage = () => {
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
export default FavoritePage;
