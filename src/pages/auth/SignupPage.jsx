import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import background from "@/assets/bg.png";
import { ArrowLeft } from "@/components/Icons";
import { SignupForm } from "@/components/auth";

const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center dark:bg-gray-900">
      <section className="w-full md:w-1/2 lg:w-2/5">
        <button
          type="button"
          className="mx-auto my-2 flex w-1/2 items-center justify-center gap-x-2 rounded-lg border 
            bg-slate-50 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 
            hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200
            dark:hover:bg-gray-700 sm:w-auto"
          onClick={() => navigate(-1)} // go back to previous url
        >
          <ArrowLeft />
          <span>{t("loginPage.back")}</span>
        </button>
        <SignupForm />
      </section>
      <section className="relative hidden h-full md:block md:w-1/2 lg:w-3/5">
        <img src={background} className="h-full w-full object-cover" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform gap-2 text-center">
          <h1 className="text-6xl font-bold text-white">
            {t("signupPage.welcome")}
          </h1>
          <p className="text-2xl text-gray-300">
            {t("signupPage.description")}
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
