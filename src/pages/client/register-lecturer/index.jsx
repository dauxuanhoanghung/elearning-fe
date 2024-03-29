import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { lecturerRegistrationService } from "@/services";
import { titleStyle } from "@/utils/styles";

const RegisterLecturerPage = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // #region Register new
  const [backgroundImageURL, setBackgroundImageURL] = useState("");
  const [agreeToRules, setAgreeToRules] = useState(false);
  const fileID = useRef();
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImageURL(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBackgroundImageURL("");
      fileID.current.value = null;
    }
  };
  const handleAgreeToRules = () => {
    setAgreeToRules(!agreeToRules);
  };

  const handleRegisterLecturer = async () => {
    if (!fileID.current.value) {
      showSnackbar({ message: "Please add your file ID!!!" });
      return;
    }
    if (!agreeToRules) {
      showSnackbar({
        message: "Please check on checkbox to agree the rules!!!",
      });
      return;
    }
    const request = new FormData();
    request.append("file", fileID.current.files[0]);
    console.log(request);
    const res = await lecturerRegistrationService.registerLecturer(request);
    if (res.data.status === 201) {
      showSnackbar({ message: res.data.message, severity: "info" });
      navigate("/");
    }
  };
  // #endregion
  // #region get - update - delete
  /**
   * {imageUrl, user}
   */
  const [currentUserForm, setCurrentUserForm] = useState(null);
  useEffect(() => {
    const fetchOldForm = async () => {
      const res =
        await lecturerRegistrationService.getLecturerFormByCurrentUser();
      setCurrentUserForm(res.data.data);
    };
    fetchOldForm();
  }, []);

  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenDeleteDialog = () => {
    setOpenDialog(true);
  };
  const handleDeleteRegistrationForm = async () => {
    handleCloseDialog();
    console.log("handleDeleteRegistrationForm");
    const res =
      await lecturerRegistrationService.deleteLecturerFormByCurrentUser(
        currentUserForm?.id,
      );
    if (res.data.status === 204) {
      showSnackbar({ message: res.data.message, severity: "info" });
      navigate("/");
    }
  };
  // #endregion
  return (
    <main className="container">
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
        <Typography color="textPrimary">Register Lecturer</Typography>
      </Breadcrumbs>
      <p className="text-4xl">Register Lecturer</p>
      <Box>
        {currentUserForm && (
          <>
            <Box>
              <p>
                Your application haven't approved yet. Wait for admin or contact
                on: ...
              </p>
              <Typography>You have already register. See below:</Typography>
              <Typography>{currentUserForm?.registrationDate}</Typography>
              <Paper
                elevation={3}
                style={{
                  width: "100%",
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <img
                  src={currentUserForm?.imageUrl}
                  alt="Background"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </Paper>
            </Box>
            <Box>
              <Button onClick={handleOpenDeleteDialog}>
                I don't want to be lecturer
              </Button>
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle id="alert-dialog-title">
                  Do you want to delete this note?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    This action can't be redone. Are you sure to do that?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleDeleteRegistrationForm}
                    sx={{ backgroundColor: "#f50057", color: "#fff" }}
                  >
                    Yes
                  </Button>
                  <Button onClick={handleCloseDialog} autoFocus>
                    No
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </>
        )}
        {!currentUserForm && (
          <Box>
            <Box>
              <Typography variant="h6">
                Rules for Becoming a Lecturer:
              </Typography>
              <List>
                <ListItem sx={{ paddingY: 0 }}>
                  <ListItemText primary="Rule 1: Require your ID card" />
                </ListItem>
                <ListItem sx={{ paddingY: 0 }}>
                  <ListItemText primary="Rule 2: Your information in account must match to your ID card" />
                </ListItem>
                <ListItem sx={{ paddingY: 0 }}>
                  <ListItemText primary="Rule 3: Confirm to my rules above." />
                </ListItem>
                {/* Add more list items as needed */}
              </List>
            </Box>
            <label htmlFor="background-image-upload">
              <Paper
                elevation={3}
                style={{
                  width: "100%",
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {backgroundImageURL ? (
                  <img
                    src={backgroundImageURL}
                    alt="Background"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ) : (
                  <div>
                    <Typography variant="subtitle1">
                      Click to upload a your identity card
                      <label htmlFor="background-image-upload">
                        <IconButton component="span">
                          <PhotoCameraIcon fontSize="large" />
                        </IconButton>
                      </label>
                    </Typography>
                  </div>
                )}
              </Paper>
            </label>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="background-image-upload"
              type="file"
              onChange={handleImageUpload}
              ref={fileID}
            />
            <div style={{ display: "flex" }}>
              <Checkbox
                checked={agreeToRules}
                onChange={handleAgreeToRules}
                color="primary"
                id="cb"
              />
              <label
                variant="body1"
                style={{ display: "block", padding: "9px", fontSize: "20px" }}
                htmlFor="cb"
              >
                I agree to the rules for becoming a lecturer
              </label>
            </div>
            <Button onClick={handleRegisterLecturer}>Submit</Button>
          </Box>
        )}
      </Box>
    </main>
  );
};

export default RegisterLecturerPage;
