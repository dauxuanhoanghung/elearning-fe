import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import CourseContainer from "@/components/CourseContainer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { favoriteService } from "@/services";

const FavoritePage = () => {
  const { t } = useTranslation();

  const pageQuery = useQuery({
    queryKey: ["wishlist", "totalPage"],
    queryFn: () => courseService.countTotalPage(),
  });
  const {
    isLoading: paginationLoading,
    isError: paginationError,
    data: pageQueryData,
  } = pageQuery;
  const totalPage = pageQueryData?.data;

  const [page, setPage] = useState(0);
  const courseQuery = useQuery({
    queryKey: ["courses", "wishlist", page], // The query key is an array with the page number
    queryFn: () => favoriteService.getWishlist(page), // The query function returns a promise
    keepPreviousData: true,
  });

  // Use the query result object to render the data
  const { isLoading, isError, data: res } = courseQuery;
  const courses = res?.data;

  const handleChangePage = (page) => {
    setPage(page - 1);
  };

  return (
    <main data-component="wishlist-component" className="container">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Favorite Courses</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
