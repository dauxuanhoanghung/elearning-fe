import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
/**
 *
 * @param {user, text, createdDate } param0
 * @returns
 */
const Comment = ({ user, text, createdDate }) => {
  return (
    <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
      <Box display="flex" alignItems="center">
        <Avatar
          src={user.avatar}
          alt={user.name}
          style={{ marginRight: "16px" }}
        />
        <Typography variant="h6">{user.name}</Typography>
      </Box>
      <Typography variant="body1" style={{ marginTop: "8px" }}>
        {text}
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        style={{ marginTop: "8px" }}
      >
        {createdDate}
      </Typography>
    </Paper>
  );
};

export default Comment;
