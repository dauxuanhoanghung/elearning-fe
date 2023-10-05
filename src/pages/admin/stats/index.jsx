import { Breadcrumbs, Typography } from "@mui/material";
import { useEffect } from "react";
import DefaultLayout from "../../../layout";
import { Link } from "react-router-dom";

const AdminStatsPage = () => {
  useEffect(() => { }, []);
  return (
    <>
      <DefaultLayout>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            Admin
          </Link>
          <Typography color="textPrimary">Stats</Typography>
        </Breadcrumbs>
        <Typography variant="h4" style={titleStyle}>
          Stats Page
        </Typography>
      </DefaultLayout>
    </>
  );
};

export default AdminStatsPage;
