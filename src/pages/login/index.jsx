import React, { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";
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
      showSnackbar({ message: "Authenticated user can't go to this page", severity: "error" })
      navigate("/");
    }
  }, [])
  return (
    <>
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  );
};

export default Login;
