import { ReactNode, createContext, useEffect, useState } from 'react'
import { FontTesterData } from '../types/FontTesterData'

const LOCAL_STORAGE_KEY = 'font-tester'

interface Props {
  children: ReactNode
}

interface LocalStorageContextType {
  localStorageData: FontTesterData
  setLocalStorageData: React.Dispatch<React.SetStateAction<FontTesterData>>
  removeItemById: (idToRemove: string) => void
}

export const LocalStorageContext = createContext<LocalStorageContextType>({
  localStorageData: { dados: [] },
  setLocalStorageData: () => {},
  removeItemById: () => {},
})

const initialData = {
  dados: [],
}

export const LocalStorageProvider = ({ children }: Props) => {
  const [localStorageData, setLocalStorageData] = useState<FontTesterData>(
    () => {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY)
      return storedData ? JSON.parse(storedData) : initialData
    }
  )

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localStorageData))
  }, [localStorageData])

  const removeItemById = (idToRemove: string) => {
    setLocalStorageData((prevData) => {
      const updatedData = {
        ...prevData,
        dados: prevData.dados.filter((item) => item.id !== idToRemove),
      }
      return updatedData
    })
  }

  return (
    <LocalStorageContext.Provider
      value={{ localStorageData, setLocalStorageData, removeItemById }}
    >
      {children}
    </LocalStorageContext.Provider>
  )
}
