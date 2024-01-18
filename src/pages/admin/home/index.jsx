import { Box, Breadcrumbs, Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { statsService } from "@/services";
import { titleStyle } from "@/utils/styles";
import MyPieChart from "./MyPieChart";

const AdminHomePage = () => {
  const [countUserByRole, setCountUserByRole] = useState([]);

  useEffect(() => {
    const fetchCountUserByRole = async () => {
      const res = await statsService.getCountUserByRole();
      console.log(res);
      if (res.data.status === 200) {
        setCountUserByRole(res.data.data);
      }
    };
    fetchCountUserByRole();
  }, []);
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
        <Typography color="textPrimary">Admin</Typography>
      </Breadcrumbs>
      <Typography variant="h4" style={titleStyle}>
        Admin Page
      </Typography>
      <Grid container>
        <Grid item md={6} lg={6}>
          <Card>
            <Typography variant="h4">Count User By Role</Typography>
            <Box height="60vh">
              <MyPieChart data={countUserByRole} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminHomePage;
