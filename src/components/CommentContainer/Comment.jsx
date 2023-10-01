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
const Comment = ({ user, content, createdDate }) => {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Avatar
          src={user?.avatar}
          alt={user?.firstName + user?.lastName}
          style={{ marginRight: "16px" }}
        />
        <Box>
          <Typography variant="h6">{`${user?.firstName} ${user?.lastName}`}</Typography>
          <Typography variant="body1" style={{ marginTop: "4px" }}>
            {content}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginTop: "2px" }}
          >
            {createdDate}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Comment;
