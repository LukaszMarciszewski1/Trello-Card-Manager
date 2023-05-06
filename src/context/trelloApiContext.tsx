import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardDescription } from 'models/card';
import { Member, Board, List } from 'models/trelloDataModels/index';
import trelloApi from 'api/trello/trelloApi';
import { createContext, useContext } from 'react';
import { useAuth } from 'hooks/useAuth';

interface TrelloApiProviderProps {
  children: React.ReactNode;
}

interface Status {
  loading: boolean;
  success: boolean;
  error: boolean;
}

interface TrelloApiContextData {
  status: Status;
  cards: Card[] | [];
  boards: Board[] | [];
  lists: List[] | [];
  members: Member[] | [];
  trelloUser: Member | undefined;
  addCard: (data: Card, listId: string) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  archiveCard: (id: string) => Promise<void>;
  getBoards: () => Promise<void>;
  getCards: (filter: string) => Promise<void>;
  getLists: (filter: string) => Promise<void>;
  getMembers: () => Promise<void>;
}

export const TrelloApiContext = createContext<TrelloApiContextData>({
  status: {
    loading: false,
    success: false,
    error: false,
  },
  cards: [],
  boards: [],
  lists: [],
  members: [],
  trelloUser: undefined,
  addCard: async () => {},
  deleteCard: async () => {},
  archiveCard: async () => {},
  getBoards: async () => {},
  getCards: async () => {},
  getLists: async () => {},
  getMembers: async () => {},
});

export const TrelloApiContextProvider: React.FC<TrelloApiProviderProps> = ({
  children,
}) => {
  const { user } = useAuth();
  const [cards, setCards] = useState<Card[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [trelloUser, setTrelloUser] = useState<Member | undefined>();
  const [status, setStatus] = useState<Status>({
    loading: false,
    success: false,
    error: false,
  });

  const addCard = async (data: Card, listId: string): Promise<void> => {
    setStatus({ ...status, loading: true });
    try {
      await trelloApi.createTrelloCard(data, listId);
      setStatus({ ...status, success: true, loading: false });
    } catch (e) {
      setStatus({ ...status, error: true });
      console.log(e);
    }
  };

  const deleteCard = async (id: string): Promise<void> => {
    try {
      await trelloApi.deleteTrelloCard(id);
      setStatus({ ...status, success: true });
    } catch (e) {
      console.error(e);
    }
  };

  const archiveCard = async (id: string): Promise<void> => {
    try {
      await trelloApi.archiveTrelloCard(id);
    } catch (e) {
      console.error(e);
    }
  };

  const getBoards = async (): Promise<void> => {
    try {
      const response = await trelloApi.getTrelloBoards();
      setBoards(response);
    } catch (e) {
      console.error(e);
    }
  };

  const getCards = async (filter: string): Promise<void> => {
    try {
      const response = await trelloApi.getTrelloCards(filter);
      setCards(response);
    } catch (e) {
      console.error(e);
    }
  };

  const getLists = async (filter: string): Promise<void> => {
    try {
      const response = await trelloApi.getTrelloLists(filter);
      setLists(response);
    } catch (e) {
      console.error(e);
    }
  };

  const getMembers = async (): Promise<void> => {
    try {
      const response = await trelloApi.getTrelloMembers();
      setMembers(response);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    const user = userStorage ? JSON.parse(userStorage) : null
    if (user) {
      const currentMember = members?.find((member) => member.username.includes(user.username))
      setTrelloUser(currentMember);
    }
  }, [members]);

  const value = {
    status,
    cards,
    boards,
    lists,
    members,
    trelloUser,
    addCard,
    deleteCard,
    archiveCard,
    getBoards,
    getCards,
    getLists,
    getMembers,
  };

  return (
    <TrelloApiContext.Provider value={value}>{children}</TrelloApiContext.Provider>
  );
};
