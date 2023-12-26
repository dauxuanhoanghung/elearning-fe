import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login, setUser } from "@/app/store/userSlice";
import { authService, userService } from "@/services";
import { removeVietnameseTones } from "@/utils/utils";
import Spinner from "../Spinner";

const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LoginGoogleBtn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLoginGoogle = async (credential) => {
    console.log("LoginGoogleBtn >>>", credential);
    const data = {
      username:
        removeVietnameseTones(credential.family_name).toLowerCase() +
        credential.sub,
      password: "123456", //Đặt tạm
      confirmPassword: "123456",
      firstName: credential.given_name,
      lastName: credential.family_name,
      email: credential.email,
      avatar: credential.picture,
    };
    setLoading(true);
    const res = await authService.loginGoogle(data);
    dispatch(login(res.data.data));
    userService.getCurrentUser().then((res) => {
      dispatch(setUser(res.data.data));
      navigate("/");
    });
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div style={{ width: "100%" }}>
          <GoogleOAuthProvider clientId={client_id}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                let credential = jwt_decode(credentialResponse.credential);
                handleLoginGoogle(credential);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </div>
      )}
    </>
  );
};

export default LoginGoogleBtn;
