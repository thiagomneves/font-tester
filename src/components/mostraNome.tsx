import { useState } from 'react'
import { Grid, ListItemText, ListSubheader, Paper } from '@mui/material'
import styled from 'styled-components'
import { FontGroupData } from '../types/FontGroupData'

export const MyPaper = styled(Paper)<{ $cor: string }>`
  margin: 10px;
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: ${(props) => props.$cor};
`
export const Span = styled.span<{ $tamanho?: number; $cor: string }>`
  font-size: ${(props) => props.$tamanho}px;
  color: ${(props) => props.$cor};
`

export const Tooltip = styled.div`
  position: absolute;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #03121f;
  color: #fff;
  background-color: #051e34;
`

interface MostraNomeProps {
  dados: FontGroupData
  estatico?: boolean
}

export default function MostraNome({
  dados,
  estatico = false,
}: MostraNomeProps) {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>): void => {
    const x = e.clientX
    const y = e.clientY
    setTooltipPosition({ x, y })
    setIsVisible(true)
  }

  const handleMouseOut = (): void => {
    setIsVisible(false)
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
              className={dados.principal.fonte}
              $tamanho={dados.principal.tamanho}
              $cor={dados.principal.cor}
            >
              {dados.principal.nome}
            </Span>
            <Span
              className={dados.secundario.fonte}
              $tamanho={dados.secundario.tamanho}
              $cor={dados.secundario.cor}
            >
              {dados.secundario.nome}
            </Span>
          </>
        ) : (
          <Span>&nbsp;</Span>
        )}
      </MyPaper>
      {estatico && isVisible && (
        <Tooltip
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
        </Tooltip>
      )}
    </>
  )
}
