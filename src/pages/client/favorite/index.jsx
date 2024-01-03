import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";

import CourseContainer from "@/components/CourseContainer";
import DefaultLayout from "@/layout";
import { titleStyle } from "@/utils/styles";

const FavoritePage = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Typography color="textPrimary">My Favorite Courses</Typography>
        </Breadcrumbs>
        <Typography variant="h4" style={titleStyle}>
          My Favorite Courses
        </Typography>
        <CourseContainer isFavoritePage={true} />
      </DefaultLayout>
    </>
  );
};
export default FavoritePage;
