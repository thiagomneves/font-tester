import { useContext, useState } from 'react'
import {
  Grid,
  IconButton,
  ListItemText,
  ListSubheader,
  Paper,
  Tooltip,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import styled from 'styled-components'
import { FontGroupData } from '../types/FontGroupData'
import { LocalStorageContext } from '../contexts/LocalStorageContext'

const MyPaper = styled(Paper)<{ $cor: string }>`
  margin: 10px;
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  && {
    background-color: ${(props) => props.$cor};
  }
`
const Span = styled.span<{ $tamanho?: number; $cor?: string, $weight: number }>`
  font-size: ${(props) => props.$tamanho}px;
  font-weight: ${(props) => props.$weight};
  color: ${(props) => props.$cor};
`

const MyTooltip = styled.div`
  position: absolute;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #03121f;
  color: #fff;
  background-color: #051e34;
`

const MuiTooltipContainer = styled.div`
  position: relative;
`

interface MostraNomeProps {
  dados: FontGroupData
  estatico?: boolean
}

export default function MostraNome({
  dados,
  estatico = false,
}: MostraNomeProps) {
  const { removeItemById } = useContext(LocalStorageContext)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isMouseOverCLose, setIsMouseOverClose] = useState<boolean>(false)

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isMouseOverCLose) {
      const x = e.clientX
      const y = e.clientY
      setTooltipPosition({ x, y })
      setIsVisible(true)
    }
  }

  const handleMouseOut = (): void => {
    setIsVisible(false)
  }

  const handleMouseOverClose = (): void => {
    setIsMouseOverClose(true)
  }

  const handleMouseOutClose = (): void => {
    setIsMouseOverClose(false)
  }

  const apagar = (id: string): void => {
    removeItemById(id)
  }

  return (
    <>
      <MyPaper
        elevation={3}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        $cor={dados.fundo.cor}
      >
        {dados.principal.nome.trim() || dados.secundario.nome.trim() ? (
          <>
            <Span
              className={dados.principal.fonte.classe}
              $tamanho={dados.principal.tamanho}
              $cor={dados.principal.cor}
              $weight={dados.principal.variante.weight}
            >
              {dados.principal.nome}
            </Span>
            <Span
              className={dados.secundario.fonte.classe}
              $tamanho={dados.secundario.tamanho}
              $cor={dados.secundario.cor}
              $weight={dados.principal.variante.weight}
            >
              {dados.secundario.nome}
            </Span>
          </>
        ) : (
          <Span>&nbsp;</Span>
        )}
        {estatico && (
          <MuiTooltipContainer>
            <Tooltip
              title="Apagar"
              onMouseOver={handleMouseOverClose}
              onMouseOut={handleMouseOutClose}
              onClick={() => apagar(dados.id!)}
              style={{
                position: 'absolute',
                bottom: '0', // Defina a posição vertical desejada (0 para o canto superior)
                right: '0', // Defina a posição horizontal desejada (0 para o canto direito)
              }}
            >
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </MuiTooltipContainer>
        )}
      </MyPaper>
      {estatico && isVisible && (
        <MyTooltip
          style={{
            position: 'absolute',
            top: `${tooltipPosition.y + 10}px`, // Ajuste a posição vertical como desejar
            left: `${tooltipPosition.x + 10}px`, // Ajuste a posição horizontal como desejar
          }}
        >
          <Grid container spacing={2}>
            {dados.principal.nome.trim() && (
              <ListSubheader
                sx={{ bgcolor: 'inherit', color: 'inherit' }}
                component="div"
                id="nested-list-subheader"
              >
                Fonte Principal:
                <ListSubheader
                  sx={{ bgcolor: 'inherit', color: 'inherit' }}
                  component="div"
                  id="nested-list-subheader"
                >
                  <ListItemText primary={`Nome: ${dados.principal.nome}`} />
                  <ListItemText
                    primary={`Tamanho: ${dados.principal.tamanho}`}
                  />
                  <ListItemText primary={`Cor: ${dados.principal.cor}`} />
                </ListSubheader>
              </ListSubheader>
            )}

            {dados.secundario.nome.trim() && (
              <ListSubheader
                sx={{ bgcolor: 'inherit', color: 'inherit' }}
                component="div"
                id="nested-list-subheader"
              >
                Fonte Secundario:
                <ListSubheader
                  sx={{ bgcolor: 'inherit', color: 'inherit' }}
                  component="div"
                  id="nested-list-subheader"
                >
                  <ListItemText primary={`Nome: ${dados.secundario.nome}`} />
                  <ListItemText
                    primary={`Tamanho: ${dados.secundario.tamanho}`}
                  />
                  <ListItemText primary={`Cor: ${dados.secundario.cor}`} />
                </ListSubheader>
              </ListSubheader>
            )}

            <ListSubheader
              sx={{ bgcolor: 'inherit', color: 'inherit' }}
              component="div"
              id="nested-list-subheader"
            >
              Fundo: {dados.fundo.cor}
            </ListSubheader>
          </Grid>
        </MyTooltip>
      )}
    </>
  )
}
