import { ReactNode } from "react";
import { DarkModeProvider } from "./DarkModeContext";
import { OpenChatDrawerProvider } from "./OpenChatDrawerContext";
import { SnackbarProvider } from "./SnackbarContext";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <DarkModeProvider>
      <SnackbarProvider>
        <OpenChatDrawerProvider>{children}</OpenChatDrawerProvider>
      </SnackbarProvider>
    </DarkModeProvider>
  );
}

export default AppProvider;
