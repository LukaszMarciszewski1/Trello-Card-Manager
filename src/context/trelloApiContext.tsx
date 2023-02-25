import { createContext, useContext } from 'react';
import { TrelloApi } from 'api/TrelloApi';
interface TrelloProviderProps {
  children: React.ReactNode
}

export const TrelloApiContext = createContext<TrelloApiContextType | null>(null)
type TrelloApiContextType = ReturnType<typeof TrelloApi>

export const TrelloApiContextProvider: React.FC<TrelloProviderProps> = ({ children }) => {
  const value = TrelloApi()

  return (
    <TrelloApiContext.Provider value={value}>
      {children}
    </TrelloApiContext.Provider>
  )
}

export const useTrelloApi = () => {
  const trelloApi = useContext(TrelloApiContext)

  if (!trelloApi) {
    throw new Error('useTrelloApi needs to be used inside TrelloApiContextProvider')
  }

  return trelloApi
}
