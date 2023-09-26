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
  "281158067602-ojdjfk6tuna36d0lqjhsni8q2ic1l6ec.apps.googleusercontent.com";

function LoginGoogleBtn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const handleLoginGoogle = (credential) => {
    console.log(credential);
    const data = {
      username:
        removeVietnameseTones(credential.family_name).toLowerCase() +
        credential.sub,
      password: "ou@123", //Đặt tạm
      confirmPassword: "ou@123",
      firstName: credential.name,
      email: credential.email,
    };
    setLoading(true);
    userService.register(data).then((res) => {
      const profile = res.data.data;
      const auth = {
        username: data.alumniId,
        password: "ou@123",
      };
      authService.login(auth).then((res) => {
        const token = res.data.data.token;
        setAccessTokenToLS(token);
        navigate("/");
      });
      //   if (profile !== "Username exists") {
      //     setProfileToLS(profile);
      //     setUser(profile);
      //   } else {
      //     userService.getUserById(data.alumniId).then((res) => {
      //       setProfileToLS(res.data);
      //       setUser(res.data);
      //     });
      //   }

      console.log(res.data.data);
    });
    console.log(data);
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
}

export default LoginGoogleBtn;
