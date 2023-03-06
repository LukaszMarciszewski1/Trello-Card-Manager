import { AuthContextProvider } from 'context/authContext';
import { TrelloApiContextProvider } from 'context/trelloApiContext';

interface AppProvidersProps {
  children: React.ReactNode
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthContextProvider>
      <TrelloApiContextProvider>
        {children}
      </TrelloApiContextProvider>
    </AuthContextProvider>
  )
}

export default AppProviders