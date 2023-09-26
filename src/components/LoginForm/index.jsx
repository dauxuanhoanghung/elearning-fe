import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import LoginGoogleBtn from "../LoginGoogleBtn";

const LoginForm = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="login">
        <div className="login__content">
          <LoginGoogleBtn />

          <button className="login__option">
            <img
              src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png"
              alt="facebook"
            />
            <h4>Continue with Facebook</h4>
          </button>

          <div className="login__inputs">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
              Log In
            </button>
          </div>
          <div className="login__text">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;