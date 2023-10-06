import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  Input,
} from "@mui/material";
import "./SignUp.css";
import { toast } from "react-toastify";
import userService from "../../services/userService";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const process = async () => {
      const request = new FormData();
      for (let field in formData) request.append(field, formData[field]);
      if (selectedFile) request.append("avatarFile", selectedFile);
      //   for (const pair of request.entries()) {
      //     console.log(pair[0], pair[1]);
      //   }
      const res = await userService.register(request);
      console.log(res);
      if (res?.data?.status === 201) {
        navigate("/login");
      }
    };
    e.preventDefault();
    if (formData["password"] === formData["confirmPassword"]) process();
    else {
      toast.error("Error");
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ marginY: "10px" }}>
        <Paper
          elevation={3}
          style={{ padding: "20px" }}
          className=".signUp__section"
        >
          <Typography variant="h4" align="center" className="">
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} className=".signUp__inputs">
                <TextField
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  name="username"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .bit" // Define the allowed file types
                  style={{ display: "none" }} // Hide the default file input
                  id="fileInput"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileInput">
                  <Input
                    fullWidth
                    variant="outlined"
                    readOnly
                    value={selectedFile ? selectedFile.name : ""}
                    endAdornment={
                      <Button component="span">Upload Avatar</Button>
                    }
                  />
                </label>
              </Grid>
            </Grid>
            <div className="signUp__section" style={{ marginBottom: "5px" }}>
              <p>Already have an account?</p>
              <Link to="/login" style={{ color: "#a435f0" }}>
                Log In
              </Link>
            </div>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#a435f0" }}
              fullWidth
            >
              Register
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default SignUp;
