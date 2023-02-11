import React, { createContext, useContext } from 'react';
import { TrelloApi } from 'api/TrelloApi';
interface TrelloProviderProps {
  children: React.ReactNode
}

const TrelloContext = createContext<TrelloContextData | null>(null)
type TrelloContextData = ReturnType<typeof TrelloApi>

export const TrelloProvider: React.FC<TrelloProviderProps> = ({ children }) => {
  const value = TrelloApi()

  return (
    <TrelloContext.Provider value={value}>
      {children}
    </TrelloContext.Provider>
  )
}

export const useTrelloApi = () => {
  const trello = useContext(TrelloContext)

  if (!trello) {
    throw new Error('TrelloFormContext needs to be used inside TrelloContext')
  }

  return trello
}
