import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ArrowLeft } from "@/components/Icons";
import { useTypingEffect } from "@/hooks/useTypingEffect";

const LockIcon = () => {
  return (
    <svg
      className="h-32 w-32 fill-black dark:fill-gray-200 lg:h-64 lg:w-64"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
    >
      <g>
        <g>
          <g>
            <path d="M42.666,490.667c0,11.776,9.536,21.333,21.333,21.333h384c11.797,0,21.333-9.557,21.333-21.333v-64H42.666V490.667z" />
            <polygon points="350.166,384 469.334,384 469.334,264.832    " />
            <path d="M161.834,256h60.331l-128,128h67.669l128-128h60.331l-128,128h67.669l167.979-167.979     c-2.987-1.579-6.208-2.688-9.813-2.688h-42.667v-64C405.332,66.987,338.324,0,255.999,0S106.666,66.987,106.666,149.333v64 H63.999c-11.797,0-21.333,9.557-21.333,21.333V384c0-5.461,2.091-10.923,6.251-15.083L161.834,256z M149.332,149.333     c0-58.816,47.851-106.667,106.667-106.667s106.667,47.851,106.667,106.667v64H332.5h-67.669H204.5h-55.168V149.333z" />
          </g>
        </g>
      </g>
    </svg>
  );
};

const ForbiddenPage = () => {
  const { t } = useTranslation();
  const message = useTypingEffect(t("forbidden.message"), 200);
  const description = useTypingEffect(t("forbidden.description"), 80);

  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center gap-12
     bg-white py-8 text-black dark:bg-gray-800 dark:text-gray-100"
    >
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-5xl font-bold">403 Forbidden</h1>
      </div>
      <div className="min-h-32">
        <LockIcon />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-medium">{message}</h1>
        <p className="text-center text-xl ">{description}</p>
      </div>
      <Link
        to="/"
        className="mx-auto my-2 flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-slate-50 
            px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100
          dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:w-auto"
      >
        <ArrowLeft />
        <span>{t("forbidden.backhome")}</span>
      </Link>
    </div>
  );
};

export default ForbiddenPage;
