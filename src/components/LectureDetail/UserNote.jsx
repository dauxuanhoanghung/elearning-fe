import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { secondsToMMSS } from "@/utils/utils";

const userNoteStyle = {
  backgroundColor: "#f0f0f0",
  borderRadius: "8px",
  padding: "10px",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "space-between",
};

const UserNote = ({ id, user, text, time, onTimeClick, handleDeleteNote }) => {
  const handleOnClickDeleteIcon = () => {
    setOpenDialog(true);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleDeleteUserNote = () => {
    handleCloseDialog();
    handleDeleteNote(id);
  };
  return (
    <>
      <Box style={{ ...userNoteStyle }}>
        <Typography variant="body1">
          {text}
          <span
            style={{ color: "#F9812A", cursor: "pointer" }}
            onClick={onTimeClick}
          >{` ${secondsToMMSS(time)}`}</span>
        </Typography>
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={handleOnClickDeleteIcon}
        >
          <DeleteIcon />
        </Typography>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to delete this note?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can't be redone. Are you sure to do that?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteUserNote}
            sx={{ backgroundColor: "#f50057", color: "#fff" }}
          >
            I'll delete it
          </Button>
          <Button onClick={handleCloseDialog} autoFocus>
            No. I won't delete it
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserNote;
