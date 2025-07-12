import { createContext, useContext, ReactNode } from 'react';
import { useAppStore } from '../stores/appStore';

const AppContext = createContext<ReturnType<typeof useAppStore> | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const store = useAppStore();

  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
