import { createContext, useContext } from 'react';
import { TrelloApi } from 'api/TrelloApi';
interface TrelloProviderProps {
  children: React.ReactNode
}

type TrelloApiContextType = ReturnType<typeof TrelloApi>
export const TrelloApiContext = createContext<TrelloApiContextType | null>(null)

export const TrelloApiContextProvider: React.FC<TrelloProviderProps> = ({ children }) => {
  const value = TrelloApi()

  return (
    <TrelloApiContext.Provider value={value}>
      {children}
    </TrelloApiContext.Provider>
  )
}
