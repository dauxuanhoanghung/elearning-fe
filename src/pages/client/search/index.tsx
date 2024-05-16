// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import CourseContainer from "@/components/CourseContainer";
import SpinnerOverlay from "@/components/common/SpinnerOverlay";
import { courseService } from "@/services";
import { useState } from "react";
import Sidebar from "./Sidebar";

const SearchCoursePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(0);
  const handleChangePage = (page: number) => {
    setPage(page - 1);
    console.log(page);
  };
  const {
    isLoading,
    data: courses,
    error,
  } = useQuery({
    queryKey: [
      "courses",
      "search",
      { ...Object.fromEntries(searchParams), page },
    ],
    queryFn: async () => {
      const res = await courseService.getList({
        ...Object.fromEntries(searchParams),
        page,
      });
      if (res.status === 200) return res.data;
      return [];
    },
    initialData: [],
  });

  const {
    isLoading: paginationLoading,
    data: count,
    error: paginationError,
  } = useQuery({
    queryKey: ["search:courses:count", { ...Object.fromEntries(searchParams) }],
    queryFn: async () => {
      const res = await courseService.count({
        ...Object.fromEntries(searchParams),
      });
      if (res.status === 200) return res.data;
      return 0;
    },
    initialData: 0,
  });

  return (
    <main className="mx-auto flex gap-4 md:w-[80%]">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5">
        <div className="my-4 flex items-end justify-between ">
          <h1 className="text-3xl">
            Result for:
            <span className="font-bold">{searchParams.get("kw")}</span>
          </h1>
          <h1 className="text-2xl">
            <span className="font-semibold">{count}</span> results found
          </h1>
        </div>
        {isLoading && <SpinnerOverlay />}
        <CourseContainer
          courses={courses}
          page={page}
          totalPage={Math.ceil(count / 8)}
          onPageChange={handleChangePage}
          isSearchPage={true}
          isShowPagination={true}
        />
      </div>
    </main>
  );
};

export default SearchCoursePage;
