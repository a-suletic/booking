import { useContext } from 'react';
import { AppContext, type AppContextType } from './AppContextTypes';

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context as AppContextType;
};
