import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import CourseContainer from "@/components/CourseContainer";
import LastLecturesContainer from "@/components/CourseContainer/LastLecturesContainer";
import {
  AppleIcon,
  GoogleIcon,
  MicrosoftIcon,
  SlackIcon,
  SpotifyIcon,
  TEDIcon,
} from "@/components/Icons";
import { courseService } from "@/services";

interface IconItem {
  icon: React.FC<{}>;
  href: string;
}

const icons: IconItem[] = [
  {
    icon: GoogleIcon,
    href: "https://www.google.com/",
  },
  {
    icon: MicrosoftIcon,
    href: "https://www.microsoft.com/",
  },
  {
    icon: AppleIcon,
    href: "https://www.apple.com/",
  },
  {
    icon: SlackIcon,
    href: "https://slack.com/",
  },
  {
    icon: SpotifyIcon,
    href: "https://open.spotify.com/",
  },
  {
    icon: TEDIcon,
    href: "https://ed.ted.com/",
  },
];

const HomePage = () => {
  //#region Blog
  const { t } = useTranslation();
  // const title = useTypingEffect();
  // const [blogs, setBlogs] = useState<[]>([]);

  const { isError: paginationError, data: totalPage } = useQuery({
    queryKey: ["courses", "totalPage"],
    queryFn: async () => {
      const res = await courseService.countTotalPage();
      return res.data;
    },
    initialData: 0,
  });

  const [page, setPage] = useState<number>(0);

  // Use the query result object to render the data
  const { isError, data: courses } = useQuery({
    queryKey: ["courses", { page: page }], // The query key is an array with the page number
    queryFn: async () => {
      const res = await courseService.getList({ page }); // The query function returns a promise
      if (res.status === 200) return res.data;
      return [];
    },
    // keepPreviousData: true,
    // staleTime: 600000,
    initialData: [],
  });

  const handleChangePage = (page: number) => {
    setPage(page - 1);
  };
  //#endregion

  // #region lecturer
  // const {
  //   data: lecturers,
  //   isLoading: isLecturerLoading,
  //   isError: isLecturerError,
  // } = useQuery({
  //   queryKey: ["users", "top-lecturers"],
  //   queryFn: async () => {
  //     const res = await userService.getTopLectures({});
  //     return res.data;
  //   },
  //   initialData: [],
  //   // staleTime: 600000,
  // });
  // #endregion
  return (
    <main data-component="home-page">
      <section className="bg-white dark:bg-gray-800" data-role="ads">
        <div className="max-w-8xl mx-auto grid gap-8 px-8 py-8 sm:gap-16 md:grid-cols-2 md:px-6 lg:gap-20 lg:py-16">
          <div className="mb-4 text-gray-500 dark:text-gray-400 sm:mb-8 sm:text-base sm:leading-7">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              {t("home.customer-title")}
            </h2>
            <p className="font-light lg:text-xl">{t("home.customer-detail")}</p>
          </div>
          <div className="grid grid-cols-1 gap-y-2 text-gray-500 dark:text-gray-400 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8">
            {icons.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.href}
                  className="flex items-center justify-center"
                >
                  {<item.icon />}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section
        className="mx-auto my-4 w-full md:max-w-[90%]"
        data-role="last-lectures-section"
      >
        <LastLecturesContainer />
      </section>
      <section
        className="mx-auto my-6 w-full md:max-w-[90%]"
        data-role="courses"
      >
        <h1 className="my-4 text-4xl">{t("home.recently-course")}</h1>
        <CourseContainer
          courses={courses}
          page={page}
          totalPage={totalPage}
          onPageChange={handleChangePage}
          isError={isError || paginationError}
          isShowPagination={false}
        />
      </section>
      {/*
      <section
        className="mx-auto my-4 w-full md:max-w-[90%]"
        data-roles="top-lecturers"
      >
        <h1 className="my-4 text-3xl">{t("home.popular-lecturer")}</h1>
        <LecturerContainer
          isError={isLecturerError}
          isLoading={isLecturerLoading}
          data={lecturers}
        />
          </section>
          */}
    </main>
  );
};

export default HomePage;
