import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const UserInfo = (props) => {
  const { avatar, displayName, id } = props;
  const selectedChatUser = useSelector((state) => state.chat.selectedChatUser);
  return <>
    <Box bgcolor={selectedChatUser?.id === id ? "#cc6cff" : "#fff"}
      sx={{
        width: "100%",
        display: "flex",
        padding: "8px 3px",
        alignItems: "center"
      }}>
      <Avatar alt={displayName} src={avatar} />
      <Typography variant="body1" sx={{ marginLeft: 1 }}>
        {displayName}
      </Typography>
    </Box>
  </>
}

export default UserInfo;