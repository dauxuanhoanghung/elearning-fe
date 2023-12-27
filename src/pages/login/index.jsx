import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginForm from "@/components/LoginForm";
import { useSnackbar } from "@/contexts/SnackbarContext";
import DefaultLayout from "@/layout";
import { isEmptyObject } from "@/utils/utils";

const Login = () => {
  const currentUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  // useEffect(() => {
  //   if (!isEmptyObject(currentUser)) {
  //     showSnackbar({
  //       message: "Authenticated user can't go to this page",
  //       severity: "error",
  //     });
  //     navigate("/");
  //   }
  // }, []);
  return (
    <DefaultLayout>
      <LoginForm />
    </DefaultLayout>
  );
};

export default Login;
