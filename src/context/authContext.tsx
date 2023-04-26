import axios from 'axios';
import { User } from 'models/user';
import { createContext, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (name: string, email: string, password: string) => Promise<any>;
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
  const [user, setUser] = useState<User | null>(null);

  const signUp = async (name: string, email: string, password: string) => {
    if (!name && !email && !password) return;
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
    } catch (e) {
      alert('Oops, something went wrong! Try again later');
      console.log(e)
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!email && !password) return;
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      setUser(response.data);
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      alert('Invalid email or password');
      console.log(e)
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    signUp,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};