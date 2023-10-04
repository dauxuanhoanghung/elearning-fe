import { useEffect, useState } from "react";
import DefaultLayout from "../../../layout";
import Spinner from "../../../components/Spinner";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { lecturerRegistrationService } from "../../../services";
import { Alert, Avatar, Box, Breadcrumbs, Button, CardMedia, Grid, IconButton, InputAdornment, Pagination, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { titleStyle } from "../../../utils/styles";
import { isAdmin } from "../../../utils/utils";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import { useSelector } from "react-redux";
import MyModal from "../../../components/MyModal";

const AdminApprovalPage = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!isAdmin(currentUser)) {
      showSnackbar({ message: "You are not allowed to this Admin page.", severity: "error" });
      navigate("/");
    }
  }, [])
  // #region Form
  const [registrationForms, setRegistrationForms] = useState([]);
  const [page, setPage] = useState(0);
  const [countPage, setCountPage] = useState(1);
  useEffect(() => {
    const fetchLecturerRegistrationForm = async () => {
      const res = await lecturerRegistrationService.getRegistrationForms(page);
      setLoading(false);
      setRegistrationForms(res.data.data);
    }
    fetchLecturerRegistrationForm();
  }, [page]);
  // #endregion

  const handleAcceptRegistration = async () => {
    const res = await lecturerRegistrationService.approvalForm()
    console.log(res.data.data)
  }
  const [openModal, setOpenModal] = useState(false);
  const [reason, setReason] = useState("");
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  }
  const handleCloseModal = () => {
    setOpenModal(false);
  }
  const handleDeclineRegistration = async () => {

  }
  return <>
    <DefaultLayout>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/admin" style={{ textDecoration: "none" }}>
          Admin
        </Link>
        <Typography color="textPrimary">Approval Lecturer Registration Form</Typography>
      </Breadcrumbs>
      <Typography variant="h4" style={titleStyle}>
        Approval Lecturer Registration Form
      </Typography>
      {loading && <Spinner />}
      {!loading && <>
        <Grid container>
          {registrationForms?.length === 0 && <>
            <Box container sx={{ margin: "30px", width: "100%" }}>
              <Alert severity="info" sx={{ width: "100%" }}>
                There are no registration form !!!
              </Alert>
            </Box>
          </>}
          {registrationForms.map((form) => (
            <Grid item xs={12} sm={6} md={4} key={form.id}>
              <Paper elevation={3} style={{ padding: '16px' }}>
                <Box sx={{ padding: "5px", display: "flex" }}>
                  <Box>
                    <Avatar src={form?.user.avatar} alt="User" sx={{ width: 100, height: 100 }} />
                    <Typography variant="subtitle2">Registration Date: {form?.registrationDate}</Typography>
                    <Typography variant="subtitle1">User Information:</Typography>
                    <Typography variant="body2">First Name: {form?.user.firstName}</Typography>
                    <Typography variant="body2">Last Name: {form?.user.lastName}</Typography>
                  </Box>
                  <Box>
                    <CardMedia
                      component="img"
                      height="194"
                      image={form?.imageUrl}
                    />
                  </Box>
                </Box>
                <Box sx={{ padding: "5px", display: "flex", justifyContent: "space-around" }}>
                  <Button variant="contained" onClick={handleAcceptRegistration}>Accept</Button>
                  <Button variant="outlined" color="error" onClick={() => setOpenModal(true)}>Decline</Button>
                </Box>
                <MyModal open={openModal} onClose={handleCloseModal} sx={{ height: "20%" }}>
                  <>
                    <Typography>Tell the users why you reject them</Typography>
                    <TextField
                      label="Reason to reject"
                      variant="outlined"
                      fullWidth
                      value={reason}
                      onChange={handleReasonChange}
                      onKeyUp={(e) => e.keyCode === 13 && handleDeclineRegistration()}
                      style={{ marginTop: "16px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleDeclineRegistration}>
                              <SendOutlinedIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>
                </MyModal>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {page > 1 && <Pagination count={countPage} variant="outlined" color="secondary" />}
      </>}
    </DefaultLayout>
  </>;
};

export default AdminApprovalPage;
