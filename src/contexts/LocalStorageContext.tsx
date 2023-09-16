import { ReactNode, createContext, useEffect, useState } from 'react'
import { FontTesterData } from '../types/FontTesterData'

const LOCAL_STORAGE_KEY = 'font-tester';

interface Props {
  children: ReactNode
}

interface LocalStorageContextType {
  localStorageData: FontTesterData
  setLocalStorageData: React.Dispatch<React.SetStateAction<FontTesterData>>
}

export const LocalStorageContext = createContext<LocalStorageContextType>({
  localStorageData: { dados: [] },
  setLocalStorageData: () => {},
})

export const LocalStorageProvider = ({ children }: Props) => {
  const [localStorageData, setLocalStorageData] = useState<FontTesterData>({
    dados: [],
  })

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      setLocalStorageData(JSON.parse(storedData));
    }
  }, []);

  return (
    <LocalStorageContext.Provider
      value={{ localStorageData, setLocalStorageData }}
    >
      {children}
    </LocalStorageContext.Provider>
  )
}
