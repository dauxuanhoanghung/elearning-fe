import React from "react";
import { Box, Typography } from "@mui/material";

const userNoteStyle = {
  backgroundColor: "#f0f0f0",
  borderRadius: "8px",
  padding: "10px",
  marginBottom: "10px",
};

const timeStyle = {
  fontSize: "0.8rem",
  color: "#888",
};

function UserNote({ user, text, time }) {
  return (
    <Box style={userNoteStyle}>
      <Typography variant="body1">{text}</Typography>
      <Typography variant="caption" style={timeStyle}>
        Time: {time}
      </Typography>
    </Box>
  );
}

export default UserNote;
