import { useContext } from 'react';
import { LocalStorageContext } from '../contexts/LocalStorageContext';

export function useLocalStorageContext() {
  return useContext(LocalStorageContext);
}
