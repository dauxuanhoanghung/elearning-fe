import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login, setUser } from "@/app/store/userSlice";
import { authService, userService } from "@/services";
import LoginGoogleBtn from "../LoginGoogleBtn";
import "./Login.css";

const LoginForm = () => {
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
    <>
      <div className="login">
        <div className="login__content">
          {/* <button className="login__option">
            <img
              src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png"
              alt="facebook"
            />
            <h4>Continue with Facebook</h4>
          </button> */}

          <div className="login__inputs">
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={handleKeyUp}
            />
            <button type="submit" onClick={handleSubmit}>
              Log In
            </button>
          </div>
          <div className="login__text">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
          <LoginGoogleBtn />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
