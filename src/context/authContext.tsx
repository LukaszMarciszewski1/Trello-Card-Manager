import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { DisplayUser, LoginUser, RegisterUser, DecodedJwt } from 'models/user';
import { createContext, useEffect, useState } from 'react';
import authApi from 'api/authApi';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  success: boolean;
  error: boolean;
  user: DisplayUser | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (username: string, email: string, password: string) => Promise<any>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  success: false,
  error: false,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  logout: () => {},
});

export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<DisplayUser | null>(null);
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const signUp = async (username: string, email: string, password: string) => {
    if (!username && !email && !password) return;
    try {
      await authApi.register({
        username,
        email,
        password,
      });
    }
     catch (e) {
      alert('Oops, something went wrong! Try again later');
      console.log(e);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!email && !password) return;
    try {
      const response = await authApi.login({
        email,
        password,
      });
      if (response) {
        const { token } = response;
        localStorage.setItem('jwt', token);
        const decodedJwt: DecodedJwt = jwt_decode(token);
        localStorage.setItem('user', JSON.stringify(decodedJwt.user));
        setUser(decodedJwt.user);
      }
    } catch (e) {
      alert('Invalid email or password');
      console.log(e);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    setUser(null);
  };

  const value = {
    success,
    error,
    user,
    signUp,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
