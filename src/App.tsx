import { Container } from '@mui/material'
import './App.css'
import FontSelector from './components/fontSelector'
import ListaSalvos from './components/listaSalvos'
import ImportaExporta from './components/importaExporta'

function App() {
  return (
    <Container>
      <ImportaExporta/>
      <FontSelector />
      <ListaSalvos />
    </Container>
  )
}

export default App
