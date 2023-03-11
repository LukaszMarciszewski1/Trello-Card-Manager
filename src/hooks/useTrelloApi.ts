import { useContext } from 'react';
import { TrelloApiContext } from 'context/trelloApiContext';

export const useTrelloApi = () => {
  const trelloApi = useContext(TrelloApiContext);

  if (!trelloApi) {
    throw new Error('useTrelloApi needs to be used inside TrelloApiContextProvider');
  }

  return trelloApi;
};
