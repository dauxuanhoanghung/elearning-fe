import ApprovalIcon from "@mui/icons-material/Approval";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const AdminUseCases = [
  { to: "/admin", text: "Admin Home Page", icon: <HomeIcon /> },
  { to: "/admin/stats", text: "Statistic Page", icon: <QueryStatsIcon /> },
  { to: "/admin/approval", text: "Approval Page", icon: <ApprovalIcon /> },
];

const AdminDrawer = (props) => {
  const { openDrawer, setOpenDrawer } = props;
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(!openDrawer);
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
  };
  return (
    <>
      <Drawer anchor={"right"} open={openDrawer} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={closeDrawer}
          onKeyDown={closeDrawer}
        >
          <Link
            to="/admin"
            style={{ textDecoration: "none", color: "#000", margin: "0 auto" }}
          >
            <Typography variant="h4">ADMIN PAGE</Typography>
          </Link>
          <List>
            {AdminUseCases.map((usecase, index) => (
              <React.Fragment key={usecase + index}>
                <Link to={usecase.to} style={{ textDecoration: "none" }}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{usecase.icon}</ListItemIcon>
                      <Typography style={{ color: "#000" }}>
                        {usecase.text}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
        <IconButton onClick={closeDrawer}>
          <Typography variant="subtitle2">Close</Typography>
          <ChevronRightIcon />
        </IconButton>
      </Drawer>
    </>
  );
};

export default AdminDrawer;
