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

  const {
    isLoading: paginationLoading,
    isError: paginationError,
    data: totalPage,
  } = useQuery({
    queryKey: ["wishlist", "totalPage"],
    queryFn: async () => {
      const res = await favoriteService.countTotalPage();
      return res.data;
    },
  });

  const [page, setPage] = useState(0);
  // Use the query result object to render the data
  const {
    isLoading,
    isError,
    data: courses,
  } = useQuery({
    queryKey: ["courses", "wishlist", page], // The query key is an array with the page number
    queryFn: async () => {
      const res = await favoriteService.getWishlist(page); // The query function returns a promise
      return res.data;
    },
    keepPreviousData: true,
    initialData: [],
  });

  const handleChangePage = (page) => {
    setPage(page - 1);
  };

  if (isLoading || paginationLoading) return <h1>Loading...</h1>;
  if (isError || paginationError) return <h1>Error...</h1>;

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

      <p className="text-4xl">My Wishlist ({courses.length})</p>
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
