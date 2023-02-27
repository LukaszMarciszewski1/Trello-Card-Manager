import { createContext, useEffect, useReducer, Dispatch, useState, useContext } from 'react';
import { auth } from "config/firebase";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  logout: async () => {}
});

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  const signIn = async (
    email: string, 
    password: string
  ) => {
    if (!email && !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    await signOut(auth).then(() => {
      setUser(null)
      navigate('/login')
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoading(false);
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    isLoading,
    signIn,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};