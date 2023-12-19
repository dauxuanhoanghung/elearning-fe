import { DarkModeProvider } from "./DarkModeContext";
import { OpenChatDrawerProvider } from "./OpenChatDrawerContext";
import { SnackbarProvider } from "./SnackbarContext";

export function AppProvider({ children }) {
  return (
    <>
      <DarkModeProvider>
        <SnackbarProvider>
          <OpenChatDrawerProvider>{children}</OpenChatDrawerProvider>
        </SnackbarProvider>
      </DarkModeProvider>
    </>
  );
}

export default AppProvider;
