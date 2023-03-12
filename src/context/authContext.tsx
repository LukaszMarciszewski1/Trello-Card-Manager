import { createContext, useEffect, useState } from 'react';
import { auth } from 'config/firebase';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  signIn: async () => {},
  logout: async () => {},
});

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    if (!email && !password) return;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (userCredential) {
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      navigate('/');
    }
    return userCredential
  };

  const logout = async () => {
    await signOut(auth).then(() => {
      setUser(null);
      localStorage.removeItem('user');
      navigate('/login');
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }  else {
        const userFromLocalStorage = localStorage.getItem('user');
        if (userFromLocalStorage) {
          setUser(JSON.parse(userFromLocalStorage));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
