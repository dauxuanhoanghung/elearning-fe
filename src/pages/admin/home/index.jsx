import { Breadcrumbs, Typography } from "@mui/material";
import DefaultLayout from "../../../layout";
import { Link } from "react-router-dom";
import { titleStyle } from "../../../utils/styles";

const AdminHomePage = () => {
  return <>
    <DefaultLayout>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
        <Typography color="textPrimary">Admin</Typography>
      </Breadcrumbs>
      <Typography variant="h4" style={titleStyle}>
        Admin Page
      </Typography>
    </DefaultLayout>
  </>
}

export default AdminHomePage;