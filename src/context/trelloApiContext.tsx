import { createContext } from 'react';
import { TrelloApi } from 'api/TrelloApi';
interface TrelloProviderProps {
  children: React.ReactNode
}

export const TrelloApiContext = createContext<TrelloApiContextType | null>(null)
type TrelloApiContextType = ReturnType<typeof TrelloApi>

export const TrelloApiProvider: React.FC<TrelloProviderProps> = ({ children }) => {
  const value = TrelloApi()

  return (
    <TrelloApiContext.Provider value={value}>
      {children}
    </TrelloApiContext.Provider>
  )
}
