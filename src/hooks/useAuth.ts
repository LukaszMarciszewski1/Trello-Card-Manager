import { useContext } from 'react';
import { AuthContext } from 'context/authContext';

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth needs to be used inside AuthContextProvider');
  }

  return auth;
};
