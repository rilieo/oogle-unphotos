/* Guided by tutorial https://www.youtube.com/watch?v=2-6K-TMA-nw */
import { useContext, createContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    return <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>;
};