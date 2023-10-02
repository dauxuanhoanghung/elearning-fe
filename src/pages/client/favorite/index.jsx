import { Box } from "@mui/material";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import CourseContainer from "../../../components/CourseContainer";
import DefaultLayout from "../../../layout";

const FavoritePage = () => {
  return (
    <>
      <DefaultLayout>
        <CourseContainer isFavoritePage={true} />
      </DefaultLayout>
    </>
  );
};
export default FavoritePage;
