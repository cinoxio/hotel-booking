import { useContext } from 'react';
import { AppContext } from './AppProvider';


// Hook to use the context
export const useAppContext = () =>  useContext(AppContext);

