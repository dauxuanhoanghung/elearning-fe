import { OpenChatDrawerProvider } from "./OpenChatDrawerContext";
import { SnackbarProvider } from "./SnackbarContext";

export function AppProvider({ children }) {
  return (<>
    <SnackbarProvider>
      <OpenChatDrawerProvider>
        {children}
      </OpenChatDrawerProvider>
    </SnackbarProvider>
  </>);
}

export default AppProvider;
