import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardDescription } from 'models/card';
import { Member, Board, List } from 'models/trelloDataModels/index';
import trelloApi from 'api/trello/trelloApi';
import { createContext, useContext } from 'react';
import { useAuth } from 'hooks/useAuth';
import userService from 'api/userApi';
import { DisplayUser } from 'models/user';

interface SettingsApiProviderProps {
  children: React.ReactNode;
}

interface Status {
  loading: boolean;
  success: boolean;
  error: boolean;
}

interface SettingsApiContextData {
  status: Status;
  users: DisplayUser[] | [];
  getAllUsers: () => Promise<void>;
}

export const SettingsApiContext = createContext<SettingsApiContextData>({
  status: {
    loading: false,
    success: false,
    error: false,
  },
  users: [],
  getAllUsers: async () => {},
});

export const SettingsApiContextProvider: React.FC<SettingsApiProviderProps> = ({
  children,
}) => {
  const [status, setStatus] = useState<Status>({
    loading: false,
    success: false,
    error: false,
  });
  const [users, setUsers] = useState<DisplayUser[]>([]);

  const getAllUsers = async (): Promise<void> => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response);
    } catch (e) {
      console.log(e);
    }
  };

  const value = {
    status,
    users,
    getAllUsers,
  };

  return (
    <SettingsApiContext.Provider value={value}>
      {children}
    </SettingsApiContext.Provider>
  );
};
