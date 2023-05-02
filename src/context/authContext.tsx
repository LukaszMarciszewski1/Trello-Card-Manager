import axios from 'axios';
import { DisplayUser, LoginUser, RegisterUser } from 'models/user';
import { createContext, useEffect, useState } from 'react';
import authService from 'services/api/authService';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  user: DisplayUser | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (username: string, email: string, password: string) => Promise<any>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  logout: () => {},
});

export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<DisplayUser | null>(null);

  const signUp = async (username: string, email: string, password: string) => {
    if (!username && !email && !password) return;
    try {
      await authService.register({
        username,
        email,
        password,
      });
    } catch (e) {
      alert('Oops, something went wrong! Try again later');
      console.log(e);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!email && !password) return;
    try {
      const response = await authService.login({
        email,
        password,
      });
      if (response) {
        setUser(response.user);
      }
    } catch (e) {
      alert('Invalid email or password');
      console.log(e);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');
    const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null
    if (user) {
      setUser(user);
    }
  }, []);

  const value = {
    user,
    signUp,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
