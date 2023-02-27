import { AuthContext } from "context/authContext";
import { useContext } from "react";

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth needs to be used inside AuthContextProvider');
  }

  return auth;
};