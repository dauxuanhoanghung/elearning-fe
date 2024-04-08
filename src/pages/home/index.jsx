import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import CourseContainer from "@/components/CourseContainer";
import {
  AppleIcon,
  GoogleIcon,
  MicrosoftIcon,
  SlackIcon,
  SpotifyIcon,
  TEDIcon,
} from "@/components/Icons";
import { LecturerContainer } from "@/components/lecturer";
import { courseService, userService } from "@/services";

const icons = [
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
  const [blogs, setBlogs] = useState([]);

  const pageQuery = useQuery({
    queryKey: ["totalPage"],
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
    queryKey: ["courses", page], // The query key is an array with the page number
    queryFn: () => courseService.getCourses(page), // The query function returns a promise
    keepPreviousData: true,
    // staleTime: 600000,
    initialData: {},
  });

  // Use the query result object to render the data
  const { isLoading, isError, data: res } = courseQuery;
  const courses = res?.data;

  const handleChangePage = (page) => {
    setPage(page - 1);
  };
  //#endregion

  const {
    data: lecturers,
    isLoading: isLecturerLoading,
    isError: isLecturerError,
  } = useQuery({
    queryKey: ["users", "top-lecturers"],
    queryFn: async () => {
      const res = await userService.getTopLectures({});
      return res.data;
    },
    initialData: [],
    staleTime: 600000,
  });

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
        data-role="courses"
      >
        <CourseContainer
          courses={courses}
          page={page}
          totalPage={totalPage}
          onPageChange={handleChangePage}
          isError={isError || paginationError}
        />
      </section>
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
    </main>
  );
};

export default HomePage;
