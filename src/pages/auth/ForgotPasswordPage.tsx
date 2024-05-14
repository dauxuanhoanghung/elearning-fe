import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/logo.png";
import { ForgotPasswordForm } from "@/components/auth";

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="mr-2 h-20 w-20" src={logo} alt="logo" />
          Education
        </a>
        <button
          type="button"
          className="mx-auto my-2 flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-slate-50 
            px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100
          dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:w-auto"
          onClick={() => navigate(-1)} // go back to previous url
        >
          <ArrowLeft />
          <span>{t("loginPage.back")}</span>
        </button>
        <div className="w-full rounded-lg bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md sm:p-8 md:mt-0">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Change Password
          </h2>
          <ForgotPasswordForm />
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
