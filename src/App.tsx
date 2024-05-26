import { Container } from '@mui/material'
import './App.css'
import FontSelector from './components/fontSelector'
import ListaSalvos from './components/listaSalvos'
import HeaderButtons from './components/headerButtons'

function App() {
  return (
    <Container>
      <HeaderButtons/>
      <FontSelector />
      <ListaSalvos />
    </Container>
  )
}

export default App
