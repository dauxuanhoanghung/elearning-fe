// SnackbarContext.tsx
import { Alert, Slide, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

interface SnackState {
  open?: boolean;
  message: string;
  severity: "error" | "success" | "warning" | "info";
}

interface SnackbarContextProps {
  showSnackbar: (snackState: SnackState) => void;
}

const SnackbarContext = createContext<SnackbarContextProps>(
  {} as SnackbarContextProps,
);

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackState, setSnackState] = useState<SnackState>({
    open: false,
    message: "",
    severity: "error",
  });

  const handleClose = () => {
    setSnackState({ ...snackState, open: false });
  };

  const showSnackbar = ({ message, severity = "error" }: SnackState) => {
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
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackState.severity}
          sx={{ width: "100%", fontSize: "16px" }}
        >
          {snackState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

function TransitionLeft(props: any) {
  return <Slide {...props} direction="left" />;
}
