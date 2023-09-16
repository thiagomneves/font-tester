import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './fonts.css'
import './index.css'
import { LocalStorageProvider } from './contexts/LocalStorageContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LocalStorageProvider>
    <App />
  </LocalStorageProvider>
)
