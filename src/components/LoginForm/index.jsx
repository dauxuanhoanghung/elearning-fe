import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login, setUser } from "@/app/store/userSlice";
import { authService, userService } from "@/services";
import LoginGoogleBtn from "../LoginGoogleBtn";

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const processLogin = async () => {
    const res = await authService.login({ username, password });
    dispatch(login(res.data.data));
    userService.getCurrentUser().then((res) => {
      dispatch(setUser(res.data.data));
      navigate("/");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processLogin();
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      processLogin();
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 
          sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="p-6 space-y-3 md:space-y-5 sm:p-8">
            <h1
              className="text-xl text-center font-bold leading-tight tracking-tight
               text-gray-900 md:text-2xl dark:text-white"
            >
              {t("login.title")}
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("login.yourEmail")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm 
                    rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2.5
                    px-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("login.password")}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={handleKeyUp}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 block w-full py-2.5 px-3.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {t("login.forgotPassword")}
                </Link>
              </div>
              <button
                onClick={handleSubmit}
                onKeyUp={handleKeyUp}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {t("login.signIn")}
              </button>
              <p className="text-sm text-right font-light text-gray-500 dark:text-gray-400">
                {t("login.noAccount")}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {t("login.signUp")}
                </Link>
              </p>
            </form>
            <div class="flex items-center mt-1">
              <div class="w-full h-[2px] bg-gray-200"></div>
              <div class="px-2 flex justify-center items-center">or</div>
              <div class="w-full h-[2px] bg-gray-200"></div>
            </div>
            <LoginGoogleBtn />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
