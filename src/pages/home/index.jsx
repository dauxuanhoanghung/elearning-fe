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
import DefaultLayout from "@/layout";

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

const Home = () => {
  //#region Blog
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  //#endregion
  return (
    <>
      <DefaultLayout>
        <section class="bg-white dark:bg-gray-800">
          <div class="max-w-8xl mx-auto grid gap-8 px-8 py-8 sm:gap-16 md:grid-cols-2 md:px-6 lg:gap-20 lg:py-16">
            <div class="mb-4 text-gray-500 dark:text-gray-400 sm:mb-8 sm:text-base sm:leading-7">
              <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                {t("home.customer-title")}
              </h2>
              <p class="font-light lg:text-xl">{t("home.customer-detail")}</p>
            </div>
            <div class="grid grid-cols-1 gap-y-2 text-gray-500 dark:text-gray-400 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8">
              {icons.map((item, index) => {
                return (
                  <Link to={item.href} class="flex items-center justify-center">
                    {<item.icon />}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        <CourseContainer />
      </DefaultLayout>
    </>
  );
};

export default Home;
