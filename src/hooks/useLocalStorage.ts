import { useState, useEffect } from 'react';
import { FontTesterData } from '../types/FontTesterData';

const LOCAL_STORAGE_KEY = 'font-tester';

export function useLocalStorageArray(initialData: FontTesterData) {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  return [data, setData];
}


