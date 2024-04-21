import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import firebaseService from "@/app/firebase/firebaseService";
import { login, setUser } from "@/app/store/userSlice";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { authService, userService } from "@/services";
import LoginGoogleBtn from "./LoginGoogleBtn";

const LoginForm = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAfterLogin = async (res) => {
    const user = res.data;
    setTimeout(() => {
      dispatch(setUser(user));
    }, 300);
    await firebaseService.saveDocWithId("users", user.id, {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      displayName: `${user.firstName} ${user.lastName}`,
    });
  };

  const processLogin = async () => {
    try {
      const res = await authService.login({ username, password });
      dispatch(login(res.data));
      // Get user Info
      userService.getCurrentUser().then((res) => {
        navigate("/");
        handleAfterLogin(res);
      });
    } catch (e) {
      showSnackbar({
        message: "The credentials is invalid, login failed",
        severity: "error",
      });
    }
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
    <section className="w-full bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div
          className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 
          dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
        >
          <div className="space-y-3 p-6 sm:p-8 md:space-y-5">
            <h1
              className="text-center text-xl font-bold leading-tight tracking-tight
               text-gray-900 dark:text-white md:text-2xl"
            >
              {t("login.title")}
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("login.yourEmail")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 
                    bg-gray-50 px-3.5 py-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600
                    dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                    dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="example@gmail.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("login.password")}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="on"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={handleKeyUp}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 
                  text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 
                  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 
                  dark:focus:ring-blue-500 sm:text-sm"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  {t("login.forgotPassword")}
                </Link>
              </div>
              <button
                onClick={handleSubmit}
                onKeyUp={handleKeyUp}
                className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium 
                text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {t("login.signIn")}
              </button>
              <p className="text-right text-sm font-light text-gray-500 dark:text-gray-400">
                {t("login.noAccount")}
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  {t("login.signUp")}
                </Link>
              </p>
            </form>
            <div className="mt-1 flex items-center">
              <div className="h-[2px] w-full bg-gray-200"></div>
              <div className="flex items-center justify-center px-2 dark:text-gray-50">
                or
              </div>
              <div className="h-[2px] w-full bg-gray-200"></div>
            </div>
            <LoginGoogleBtn />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
