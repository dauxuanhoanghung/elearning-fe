import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Breadcrumbs, Typography } from "@mui/material";

import CourseContainer from "@/components/CourseContainer";
import { favoriteService } from "@/services";

const FavoritePage = () => {
  const { t } = useTranslation();

  const pageQuery = useQuery({
    queryKey: ["totalPage", "wishlist"],
    queryFn: () => courseService.countTotalCoursePage(),
  });
  const {
    isLoading: paginationLoading,
    isError: paginationError,
    data: pageQueryData,
  } = pageQuery;
  const totalPage = pageQueryData?.data;
  console.log("pageQuery: ", pageQuery);

  const [page, setPage] = useState(0);
  const courseQuery = useQuery({
    queryKey: ["courses", "wishlist", page], // The query key is an array with the page number
    queryFn: () => favoriteService.getWishlist(page), // The query function returns a promise
    keepPreviousData: true,
  });

  // Use the query result object to render the data
  const { isLoading, isError, data: res } = courseQuery;
  console.log("courseQuery", courseQuery);
  const courses = res?.data;

  const handleChangePage = (page) => {
    setPage(page - 1);
  };

  return (
    <main data-component="wishlist-component">
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
        <Typography color="textPrimary">My Favorite Courses</Typography>
      </Breadcrumbs>
      <p className="text-4xl">My Wishlist</p>
      <CourseContainer
        courses={courses}
        page={page}
        totalPage={totalPage}
        onPageChange={handleChangePage}
        isError={isError || paginationError}
      />
    </main>
  );
};
export default FavoritePage;
