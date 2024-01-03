import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setUser } from "@/app/store/userSlice";
import Spinner from "@/components/Spinner";
import { useSnackbar } from "@/contexts/SnackbarContext";
import DefaultLayout from "@/layout";
import { userService } from "@/services";

const ProfilePage = (props) => {
  // #region input avatar
  const [backgroundImageURL, setBackgroundImageURL] = useState("");
  const handleBackgroundImageUpload = (e) => {
    const backgroundImage = e.target.files[0];
    if (backgroundImage == null) {
      setBackgroundImageURL("");
      setUserInfo({ ...userInfo, avatarFile: null });
      return;
    }
    setUserInfo({ ...userInfo, avatarFile: backgroundImage });
    setBackgroundImageURL(URL.createObjectURL(backgroundImage));
  };
  // #endregion
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  // #region User info
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    avatarFile: null,
  });
  const getUser = async () => {
    const res = await userService.getCurrentUser();
    const data = res.data.data;
    if (res.data.status === 200) {
      setUserInfo({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        avatarFile: null,
        username: data.username,
      });
      dispatch(setUser(data));
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setUserInfo((prevUser) => {
      if (type === "file") {
        return { ...prevUser, [name]: files[0] };
      } else {
        return { ...prevUser, [name]: value };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(userInfo);
    const request = new FormData();
    for (let field in userInfo) request.append(field, userInfo[field]);
    // request.append("username", userInfo.username);
    // request.append("firstName", userInfo.firstName);
    // request.append("lastName", userInfo.lastName);
    // request.append("email", userInfo.email);
    if (userInfo.avatarFile) request.append("avatarFile", userInfo.avatarFile);
    const res = await userService.updateAccount(request);
    setLoading(false);
    if (res.data.status === 200) {
      getUser();
    }
  };
  // #endregion
  useEffect(() => {
    document.title = "My Profile";
    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <DefaultLayout>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/" style={{ textDecoration: "none" }}>
              Home
            </Link>
            <Typography color="textPrimary">My Profile</Typography>
          </Breadcrumbs>
          <Box sx={{ width: "90%", margin: "10px auto" }}>
            <Grid
              item
              md={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="h4">My Account profile</Typography>
            </Grid>
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ width: "100%" }}>
                <Grid item sm={12} xs={12}>
                  <TextValidator
                    style={{ width: "100%" }}
                    type="text"
                    name="username"
                    value={userInfo?.username}
                    disabled
                    onChange={handleInputChange}
                    label={
                      <Typography variant="subtitle2">Your username</Typography>
                    }
                    validators={["required"]}
                    errorMessages={["Trường này không được để trống"]}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextValidator
                    style={{ width: "100%" }}
                    type="text"
                    name="firstName"
                    value={userInfo?.firstName}
                    onChange={handleInputChange}
                    label={
                      <Typography variant="subtitle2">
                        <span style={{ color: "red" }}>*</span>
                        Your first name
                      </Typography>
                    }
                    validators={["required"]}
                    errorMessages={["This can be not blank"]}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextValidator
                    style={{ width: "100%" }}
                    type="text"
                    name="lastName"
                    value={userInfo?.lastName}
                    onChange={handleInputChange}
                    label={
                      <Typography variant="subtitle2">
                        <span style={{ color: "red" }}>*</span>
                        Your last name
                      </Typography>
                    }
                    validators={["required"]}
                    errorMessages={["This can be not blank"]}
                  />
                </Grid>
                <Grid item sm={12} md={12}>
                  <TextValidator
                    style={{ width: "100%" }}
                    className="input-text"
                    type="text"
                    name="email"
                    value={userInfo?.email}
                    onChange={handleInputChange}
                    label={
                      <Typography variant="subtitle2">Your Email</Typography>
                    }
                  />
                </Grid>
                <Grid item sm={12} md={12}>
                  <input
                    style={{ width: "100%", display: "none" }}
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    onChange={handleBackgroundImageUpload}
                  />
                  <label htmlFor="avatarInput">
                    <Typography variant="subtitle2">
                      {backgroundImageURL ? (
                        <>
                          <Typography variant="subtitle2">
                            Your avatar
                          </Typography>
                          <Avatar
                            src={backgroundImageURL}
                            alt="Avatar Preview"
                            style={{ width: "200px", height: "200px" }}
                          />
                        </>
                      ) : (
                        <Box sx={{ border: "solid 1px", height: "100px" }}>
                          <Typography variant="subtitle2">
                            Add your new avatar here
                          </Typography>
                        </Box>
                      )}
                    </Typography>
                  </label>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ margin: "10px 0", width: "100%" }}
                    className="btn btn--e-transparent-brand-b-2"
                    type="submit"
                  >
                    Update Info
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Box>
        </DefaultLayout>
      )}
    </>
  );
};

export default ProfilePage;
