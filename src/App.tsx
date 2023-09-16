import { Container } from '@mui/material'
import './App.css'
import FontSelector from './components/fontSelector'
import ListaSalvos from './components/listaSalvos'

function App() {
  return (
    <Container>
      <FontSelector />
      <ListaSalvos />
    </Container>
  )
}

export default App
