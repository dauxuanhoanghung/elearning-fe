import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import LoginGoogleBtn from "../LoginGoogleBtn";
import authService from "../../services/authService";
import { setProfileToLS } from "../../utils/auth";
import userService from "../../services/userService";
import UserContext from "../../contexts/UserContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = async () => {
      const res = await authService.login({ username, password });
      console.log("JWT:", res.data.data);
      userService.getCurrentUser().then((res) => {
        setProfileToLS(res.data.data);
        setUser(res.data.data);
        navigate("/");
      });
    };
    login();
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
