import { useContext } from 'react';
import { WatchSectionFormContext } from 'context/watchSectionFormContext';

export const useWatchSectionForm = () => {
  const watchForm = useContext(WatchSectionFormContext);

  if (!watchForm) {
    throw new Error('useWatchForm needs to be used inside WatchFormContextProvider');
  }

  return watchForm;
};
