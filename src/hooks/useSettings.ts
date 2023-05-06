import { useContext } from 'react';
import { SettingsApiContext } from 'context/settingsContext';

export const useSettingsApi = () => {
  const settingsApi = useContext(SettingsApiContext);

  if (!settingsApi) {
    throw new Error('useSettingsApi needs to be used inside SettingsApiContextProvider');
  }

  return settingsApi;
};
