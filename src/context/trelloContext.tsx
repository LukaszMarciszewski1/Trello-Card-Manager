import React, { createContext, useContext } from 'react';
import { AddTrelloCard } from 'api/trelloApi';
interface TrelloProviderProps {
  children: React.ReactNode
}

const TrelloContext = createContext<TrelloContextData | null>(null)
type TrelloContextData = ReturnType<typeof AddTrelloCard>

export const TrelloProvider: React.FC<TrelloProviderProps> = ({ children }) => {
  const value = AddTrelloCard()

  return (
    <TrelloContext.Provider value={value}>
      {children}
    </TrelloContext.Provider>
  )
}

export const TrelloFormContext = () => {
  const trello = useContext(TrelloContext)

  if (!trello) {
    throw new Error('TrelloFormContext needs to be used inside TrelloContext')
  }

  return trello
}
