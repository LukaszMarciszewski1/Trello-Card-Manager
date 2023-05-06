import { AuthContextProvider } from 'context/authContext';
import { TrelloApiContextProvider } from 'context/trelloApiContext';
import { WatchSectionFormContextProvider } from 'context/watchSectionFormContext';
import { SettingsApiContextProvider } from 'context/settingsContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthContextProvider>
      <SettingsApiContextProvider>
        <TrelloApiContextProvider>
          <WatchSectionFormContextProvider>
            {children}
          </WatchSectionFormContextProvider>
        </TrelloApiContextProvider>
      </SettingsApiContextProvider>
    </AuthContextProvider>
  );
};

export default AppProviders;
