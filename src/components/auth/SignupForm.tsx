import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { UploadIcon } from "@/components/Icons";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { userService } from "@/services";

const SignupForm: React.FC = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const inputFields = [
    { name: "firstName", placeholder: "Alan", label: t("signup.firstName") },
    { name: "lastName", placeholder: "Walker", label: t("signup.lastName") },
    {
      name: "email",
      placeholder: "example@gmail.com",
      label: t("signup.email"),
    },
    {
      name: "username",
      placeholder: "example@gmail.com",
      label: t("signup.username"),
    },
    {
      name: "password",
      placeholder: "••••••••",
      label: t("signup.password"),
      type: "password",
    },
    {
      name: "confirmPassword",
      placeholder: "••••••••",
      label: t("signup.confirmPassword"),
      type: "password",
    },
  ];

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const processRegister = async () => {
    const request = new FormData();
    for (let field in formData) request.append(field, formData[field]);
    if (selectedFile) request.append("avatarFile", selectedFile);
    const res = await userService.register(request);
    if (res?.data?.status === 201) {
      navigate("/login");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData["password"] === formData["confirmPassword"]) processRegister();
    else {
      showSnackbar({
        message: t("snackbar.passwordNotMatch"),
        severity: "error",
      });
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      processRegister();
    }
  };

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div
          className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 
          dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
        >
          <div className="space-y-3 p-6 sm:px-8 sm:py-4 md:space-y-5">
            <h1
              className="text-center text-xl font-bold leading-tight tracking-tight
               text-gray-900 dark:text-white md:text-2xl"
            >
              {t("signup.title")}
            </h1>
            <form className="flex flex-wrap gap-y-3">
              {inputFields.map((field, idx) => (
                <div
                  className={
                    idx < 2 ? `w-1/2 ${idx == 0 ? "pr-1" : "pl-1"}` : "w-full"
                  }
                  key={field.name}
                >
                  <label
                    htmlFor={field.name}
                    className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    id={field.name}
                    className="block w-full rounded-lg border border-gray-300 
                      bg-gray-50 px-3.5 py-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600
                      dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                      dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="flex max-h-32 w-full cursor-pointer flex-col items-center justify-center overflow-hidden 
                  rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 
                  dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  {!selectedFile ? (
                    <div className="flex flex-col items-center justify-center pb-6 pt-5 text-gray-500 dark:text-gray-400">
                      <UploadIcon />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          {t("signup.click")}
                        </span>
                        {t("signup.dnd")}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t("signup.type")}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      className="object-cover"
                    />
                  )}
                </label>
                <input
                  id="dropzone-file"
                  type="file"
                  accept=".png, .jpg, .jpeg, .bit, .gif"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <p className="text-right text-sm font-light text-gray-500 dark:text-gray-400">
                {t("signup.haveAccount")}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  {t("signup.login")}
                </Link>
              </p>
              <button
                onClick={handleSubmit}
                onKeyUp={handleKeyUp}
                className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium 
                text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {t("signup.register")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
