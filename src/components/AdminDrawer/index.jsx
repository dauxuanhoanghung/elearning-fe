import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ApprovalIcon from '@mui/icons-material/Approval';
import { Link } from "react-router-dom";

const AdminUseCases = [
  { to: "/admin", text: "Admin Home Page", icon: <HomeIcon /> },
  { to: "/admin/stats", text: "Statistic Page", icon: <QueryStatsIcon /> },
  { to: "/admin/approval", text: "Approval Page", icon: <ApprovalIcon /> },
];

const AdminDrawer = (props) => {
  const { openDrawer, setOpenDrawer } = props;
  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(!openDrawer);
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
  }
  return <>
    <Drawer
      anchor={"right"}
      open={openDrawer}
      onClose={toggleDrawer}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={closeDrawer}
        onKeyDown={closeDrawer}
      >
        <List>
          {AdminUseCases.map((usecase, index) => (
            <Link to={usecase.to} key={usecase + index} sx={{ textDecoration: "none" }} >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {usecase.icon}
                  </ListItemIcon>
                  <ListItemText primary={usecase.text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  </>
}

export default AdminDrawer;