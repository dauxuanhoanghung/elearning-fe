import React, { useEffect } from "react";
import DefaultLayout from "../../layout";
import LoginForm from "../../components/LoginForm";
import { useSelector } from "react-redux";
import { isEmptyObject } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackbarContext";

const Login = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    if (!isEmptyObject(user)) {
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
