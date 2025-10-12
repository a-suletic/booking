import { useContext } from 'react';
import { AppContext } from './AppContextTypes';
import type { AppContextType } from './AppContextTypes';

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
