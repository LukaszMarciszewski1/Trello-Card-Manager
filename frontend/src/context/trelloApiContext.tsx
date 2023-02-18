import { createContext } from 'react';
import { TrelloApi } from 'api/TrelloApi';
interface TrelloProviderProps {
  children: React.ReactNode
}

export const TrelloApiContext = createContext<TrelloApiContextType | null>(null)
type TrelloApiContextType = ReturnType<typeof TrelloApi>

export const TrelloProvider: React.FC<TrelloProviderProps> = ({ children }) => {
  const value = TrelloApi()

  return (
    <TrelloApiContext.Provider value={value}>
      {children}
    </TrelloApiContext.Provider>
  )
}

// export const useTrelloApi = () => {
//   const trello = useContext(TrelloApiContext)

//   if (!trello) {
//     throw new Error('TrelloFormContext needs to be used inside TrelloContext')
//   }

//   return trello
// }
