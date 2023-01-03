import { createContext, useContext, useEffect, useState } from 'react';
import { onUserStateChange, login, logout } from '../../api/firebase';
import {
  getAuthFromLocalStorage,
  setAuthToLocalStorage,
} from '../localStorage/AuthLocalStorage';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  // const [user, setUser] = useState({ isAdmin: true });
  const [auth, setAuth] = useState(() => getAuthFromLocalStorage());

  useEffect(() => {
    onUserStateChange((user) => {
      setAuthToLocalStorage(user);
      setAuth(user);
    }); // same as (user => setUser(user))
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
