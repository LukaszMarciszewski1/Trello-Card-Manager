import { createContext, useState } from 'react';

interface WatchSectionFormContextProviderProps {
  children: React.ReactNode;
}

type WatchSectionFormContextContextData = ReturnType<typeof useProvidersWatchSectionForm>;
export const WatchSectionFormContext = createContext<WatchSectionFormContextContextData | null>(null);

const useProvidersWatchSectionForm = () => {
  const [watchSectionForm, setWatchSectionForm] = useState({
    customPrice: '',
    sizeWidth: '',
    sizeHeight: '',
    packing: false,
    message: false,
    materials: false,
    validationMaterials: false,
  });

  return {
    watchSectionForm,
    setWatchSectionForm,
  };
};

export const WatchSectionFormContextProvider: React.FC<WatchSectionFormContextProviderProps> = ({ children }) => {
  const value = useProvidersWatchSectionForm();
  return <WatchSectionFormContext.Provider value={value}>{children}</WatchSectionFormContext.Provider>;
};
