import { SnackbarProvider } from "./SnackbarContext";

export function AppProvider({ children }) {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}

export default AppProvider;
