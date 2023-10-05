import React, { useEffect, useState } from "react";
import DefaultLayout from "../../../layout";
import { lecturerRegistrationService } from "../../../services";
import { Alert, Box, Breadcrumbs, Grid, Pagination, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { titleStyle } from "../../../utils/styles";
import { isAdmin } from "../../../utils/utils";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import { useSelector } from "react-redux";
import MySkeleton from "../../../components/MySkeleton";
import RegistrationCard from "./RegistrationCard";

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
      {loading && <MySkeleton />}
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
            <React.Fragment key={form.id}>
              <RegistrationCard form={form} setRegistrationForms={setRegistrationForms} registrationForms={registrationForms} />
            </React.Fragment>
          ))}
        </Grid>

        {page > 1 && <Pagination count={countPage} variant="outlined" color="secondary" />}
      </>}
    </DefaultLayout>
  </>;
};

export default AdminApprovalPage;
