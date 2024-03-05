import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div
      className="m-auto flex min-h-screen w-9/12 items-center justify-center py-16
     text-gray-800 dark:text-gray-100"
    >
      <div className="overflow-hidden pb-8 shadow sm:rounded-lg">
        <div className="pt-8 text-center">
          <h1 className="text-[12rem] font-bold text-purple-400">404</h1>
          <h1 className="py-8 text-6xl font-medium">{t("notFound.title")}</h1>
          <p className="px-12 pb-8 text-2xl font-medium">
            {t("notFound.description")}
          </p>
          <Link
            to="/"
            className="mr-6 rounded-md bg-gradient-to-r from-purple-400 to-blue-500 px-8 py-4 font-semibold text-white hover:from-pink-500 hover:to-orange-500"
          >
            {t("notFound.home")}
          </Link>
          <Link
            to="/contact-us"
            className="rounded-md bg-gradient-to-r from-red-300 to-red-500 px-8 py-4 font-semibold text-white hover:from-red-600 hover:to-yellow-600"
          >
            {t("notFound.contact")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
