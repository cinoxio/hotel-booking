import { useContext } from 'react';
import { AppContext } from './AppContext';
// Hook to use the context
export const useAppContext = () =>  useContext(AppContext);

