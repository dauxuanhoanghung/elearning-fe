// SnackbarContext.js
import { Alert, Slide, Snackbar } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

const SnackbarContext = createContext();

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export function SnackbarProvider({ children }) {
  const [snackState, setSnackState] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleClose = () => {
    setSnackState({ ...snackState, open: false });
  };

  const showSnackbar = ({ message, severity = "error" }) => {
    setSnackState({
      open: true,
      message,
      severity,
    });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackState.open}
        autoHideDuration={1000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackState.severity}
          sx={{ width: "100%" }}
        >
          {snackState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
