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

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth needs to be used inside AuthContextProvider');
  }

  return auth;
};



// import { createContext, useEffect, useReducer, Dispatch  } from 'react';
// import { User } from 'models/user'

// interface AuthProviderProps {
//   children: React.ReactNode
// }

// interface AuthState {
//   currentUser: User | null;
// }

// interface AuthAction {
//   type: string;
//   payload?: any;
// }

// const INITIAL_STATE: AuthState = {
//   currentUser: JSON.parse(localStorage.getItem("user") || 'null'),
// };

// export const AuthContext = createContext<{
//   state: AuthState;
//   dispatch: Dispatch<AuthAction>;
// }>({
//   state: INITIAL_STATE,
//   dispatch: () => null,
// });

// const AuthReducer = (state: AuthState, action: AuthAction) => {
//   switch (action.type) {
//     case "LOGIN": {
//       return {
//         ...state,
//         currentUser: action.payload,
//       };
//     }
//     case "LOGOUT": {
//       return {
//         ...state,
//         currentUser: null,
//       };
//     }
//     default:
//       return state;
//   }
// };

// export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);


//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(state.currentUser));
//   }, [state.currentUser]);

//   return (
//     <AuthContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }