import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


const ChatContainer = (props) => {
  const { openDrawer, setOpenDrawer } = props
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
      anchor={"left"}
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
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  </>
}

export default ChatContainer;