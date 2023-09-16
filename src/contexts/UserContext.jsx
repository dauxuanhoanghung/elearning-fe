import { createContext, useState } from 'react';
import { getProfileFromLS } from '../utils/auth';

export const UserContext = createContext();
export function UserProvider({ children }) {
  const [user, setUser] = useState(getProfileFromLS() || {});
  const value = {
    profile: user,
    setUser
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;