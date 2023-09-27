import { SnackbarProvider } from "./SnackbarContext";
import { UserProvider } from "./UserContext";

export function AppProvider({ children }) {
  return (
    <UserProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </UserProvider>
  );
}

export default AppProvider;
