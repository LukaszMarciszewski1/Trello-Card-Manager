import { createContext, useContext, useState } from 'react';

interface WatchFormContextProviderProps {
  children: React.ReactNode
}

type WatchFormContextContextData = ReturnType<typeof useProvidersWatchForm>
export const WatchFormContext = createContext<WatchFormContextContextData | null>(null);

interface WatchFormTypes {
  customPrice: string,
  sizeWidth: string,
  sizeHeight: string,
  packing: boolean,
  message: boolean,
  materials: boolean,
  validationMaterials: boolean
}

const useProvidersWatchForm = () => {
  const [watchForm, setWatchForm] = useState<WatchFormTypes>({
    customPrice: '',
    sizeWidth: '',
    sizeHeight: '',
    packing: false,
    message: false,
    materials: false,
    validationMaterials: false
  })

  return {
    watchForm, setWatchForm
  }
}

export const WatchFormContextProvider: React.FC<WatchFormContextProviderProps> = ({ children }) => {
  const value = useProvidersWatchForm()
  return (
    <WatchFormContext.Provider value={value}>
      {children}
    </WatchFormContext.Provider>
  );
};

export const useWatchForm = () => {
  const watchForm = useContext(WatchFormContext)

  if (!watchForm) {
    throw new Error('useWatchForm needs to be used inside WatchFormContextProvider')
  }

  return watchForm
}