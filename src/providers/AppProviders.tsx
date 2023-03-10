import { AuthContextProvider } from 'context/authContext';
import { TrelloApiContextProvider } from 'context/trelloApiContext';
import { WatchFormContextProvider } from 'context/watchFormContext';

interface AppProvidersProps {
  children: React.ReactNode
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthContextProvider>
      <TrelloApiContextProvider>
        <WatchFormContextProvider>
          {children}
        </WatchFormContextProvider>
      </TrelloApiContextProvider>
    </AuthContextProvider>
  )
}

export default AppProviders