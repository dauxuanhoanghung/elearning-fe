import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layout";
import LoginForm from "@/components/LoginForm";
import { isEmptyObject } from "@/utils/utils";
import { useSnackbar } from "@/contexts/SnackbarContext";

const Login = () => {
  const currentUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    if (!isEmptyObject(currentUser)) {
      showSnackbar({
        message: "Authenticated user can't go to this page",
        severity: "error",
      });
      navigate("/");
    }
  }, []);
  return (
    <DefaultLayout>
      <LoginForm />
    </DefaultLayout>
  );
};

export default Login;
