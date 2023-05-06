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
interface SettingsApiContextData {
  users: DisplayUser[] | [];
  getAllUsers: () => Promise<void>;
  updateUser: (id: string, body: string) => Promise<void>;
}

export const SettingsApiContext = createContext<SettingsApiContextData>({
  users: [],
  getAllUsers: async () => {},
  updateUser: async () => {},
});

export const SettingsApiContextProvider: React.FC<SettingsApiProviderProps> = ({
  children,
}) => {
  const [users, setUsers] = useState<DisplayUser[]>([]);

  const getAllUsers = async (): Promise<void> => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response);
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async (id: string): Promise<void> => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response);
    } catch (e) {
      console.log(e);
    }
  };

  const updateUser = async (id: string, body: string): Promise<void> =>{
    try {
      await userService.updateUser(id, body);
    } catch (e) {
      console.log(e);
    }
  }

  const value = {
    users,
    getAllUsers,
    updateUser,
  };

  return (
    <SettingsApiContext.Provider value={value}>
      {children}
    </SettingsApiContext.Provider>
  );
};
