import React, { createContext, useContext } from 'react';
import { AddTrelloCard } from 'api/trello';

// export const TrelloContext = createContext({});

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
  const auth = useContext(TrelloContext)

  if (!auth) {
    throw new Error('useAuth needs to be used inside AuthContext')
  }

  return auth
}
