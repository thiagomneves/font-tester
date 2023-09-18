import { useContext, useRef, useState } from 'react'
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
const Span = styled.span<{
  $tamanho?: number
  $cor?: string
  $weight?: number
  $italic?: boolean
}>`
  font-size: ${(props) => props.$tamanho}px;
  font-weight: ${(props) => props.$weight};
  font-style: ${(props) => (props.$italic ? 'italic' : 'normal')};
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
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isMouseOverClose, setIsMouseOverClose] = useState<boolean>(false)
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isMouseOverClose) {
      const x = e.clientX
      const y = e.clientY

      // Obtém as dimensões da viewport
      const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight

      // Obtém as dimensões da tooltip
      const tooltipWidth = tooltipRef.current
        ? tooltipRef.current.offsetWidth
        : 0
      const tooltipHeight = tooltipRef.current
        ? tooltipRef.current.offsetHeight
        : 0

      // Define uma margem de segurança para garantir que o tooltip não ultrapasse os limites da viewport
      const margin = 10

      // Calcula a posição horizontal ideal
      let tooltipLeft = x + margin
      if (x + tooltipWidth + margin > viewportWidth) {
        tooltipLeft = viewportWidth - tooltipWidth - margin
      }

      // Calcula a posição vertical ideal
      let tooltipTop = y + margin
      if (y + tooltipHeight + margin > viewportHeight) {
        tooltipTop = viewportHeight - tooltipHeight - margin
      }

      const tooltipPosition = { left: tooltipLeft, top: tooltipTop }

      setTooltipPosition(tooltipPosition)
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
              $italic={dados.principal.variante.italic}
            >
              {dados.principal.nome}
            </Span>
            <Span
              className={dados.secundario.fonte.classe}
              $tamanho={dados.secundario.tamanho}
              $cor={dados.secundario.cor}
              $weight={dados.secundario.variante.weight}
              $italic={dados.secundario.variante.italic}
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
          ref={tooltipRef}
          style={{
            position: 'absolute',
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
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
                  <ListItemText
                    primary={`Familia: ${dados.principal.fonte.nome}`}
                  />
                  <ListItemText primary={`Cor: ${dados.principal.cor}`} />
                  <ListItemText
                    primary={`Espessura: ${dados.principal.variante.weight}`}
                  />
                  <ListItemText
                    primary={`Estilo: ${
                      dados.principal.variante.italic ? 'Italic' : 'Normal'
                    }`}
                  />
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
                  <ListItemText
                    primary={`Familia: ${dados.secundario.fonte.nome}`}
                  />
                  <ListItemText primary={`Cor: ${dados.secundario.cor}`} />
                  <ListItemText
                    primary={`Espessura: ${dados.secundario.variante.weight}`}
                  />
                  <ListItemText
                    primary={`Estilo: ${
                      dados.secundario.variante.italic ? 'Italic' : 'Normal'
                    }`}
                  />
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
