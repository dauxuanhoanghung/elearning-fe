import { UserProvider } from "./UserContext";

export function AppProvider({ children }) {
  return <UserProvider>{children}</UserProvider>;
}

export default AppProvider;
