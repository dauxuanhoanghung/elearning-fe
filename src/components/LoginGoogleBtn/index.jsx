import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import userService from "../../services/userService";
import UserContext from "../../contexts/UserContext";
import Spinner from "../Spinner";
import { setAccessTokenToLS, setProfileToLS } from "../../utils/auth";
import { removeVietnameseTones } from "../../utils/utils";
const client_id =
  "402026854293-394gqacf406s92p1ujrd2bndv764psm3.apps.googleusercontent.com";
const client_secret = "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";
const LoginGoogleBtn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
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
    console.log("JWT:", res.data.data);
    const token = res.data.data.token;
    setAccessTokenToLS(token);
    userService.getCurrentUser().then((res) => {
      setProfileToLS(res.data.data);
      setUser(res.data.data);
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
