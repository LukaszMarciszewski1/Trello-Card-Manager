import { AuthContextProvider } from 'context/authContext';
import { TrelloApiContextProvider } from 'context/trelloApiContext';
import { WatchSectionFormContextProvider } from 'context/watchSectionFormContext';

interface AppProvidersProps {
  children: React.ReactNode
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthContextProvider>
      <TrelloApiContextProvider>
        <WatchSectionFormContextProvider>
          {children}
        </WatchSectionFormContextProvider>
      </TrelloApiContextProvider>
    </AuthContextProvider>
  )
}

export default AppProviders