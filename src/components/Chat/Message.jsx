import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Message = (props) => {
  const currentUser = useSelector((state) => state.user.user);
  const selectedChatUser = useSelector((state) => state.chat.selectedChatUser);
  const { text: message, senderId, recipientId } = props;
  const isMyMessage = senderId === currentUser.id;
  return (
    <Box
      sx={{ display: "flex", width: "100%" }}
      justifyContent={isMyMessage ? "flex-end" : "flex-start"}
    >
      {senderId !== currentUser.id && (
        <Avatar
          sx={{ bgcolor: "red" }}
          aria-label="recipe"
          src={selectedChatUser.avatar}
        />
      )}
      <Box margin="4px 2px">
        <Box
          bgcolor={isMyMessage ? "primary.main" : "grey.300"}
          color={isMyMessage ? "white" : "text.primary"}
          borderRadius="8px"
          padding="8px 12px"
          maxWidth="100%"
        >
          <Typography>{message}</Typography>
        </Box>
      </Box>
      {isMyMessage && (
        <Avatar
          sx={{ bgcolor: "red" }}
          alt={currentUser.displayName}
          src={currentUser.avatar}
        />
      )}
    </Box>
  );
};

export default Message;
