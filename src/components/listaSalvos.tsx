import { useContext } from 'react'
import { Grid, Typography } from '@mui/material'
import { LocalStorageContext } from '../contexts/LocalStorageContext'
import { FontGroupData } from '../types/FontGroupData'
import MostraNome from './mostraNome'

export default function ListaSalvos() {
  const { localStorageData } = useContext(LocalStorageContext)

  const dividirEmGrupos = (
    array: FontGroupData[],
    tamanhoGrupo: number
  ): FontGroupData[][] => {
    const grupos = []
    for (let i = 0; i < array.length; i += tamanhoGrupo) {
      grupos.push(array.slice(i, i + tamanhoGrupo))
    }
    return grupos
  }
  const grupos = dividirEmGrupos(localStorageData.dados, 3)

  return (
    <>
      {localStorageData.dados.length && (
        <section>
          <Typography variant="h4" align='center' marginTop={10}>
            LISTA SALVOS
          </Typography>
          {grupos.map((grupo, indice) => (
            <Grid container spacing={0} key={`grupo${indice}`}>
              {grupo.map((item, index) => (
                <Grid item xs={4} key={`item${index}`}>
                  <MostraNome
                    key={`${index}${item.principal.nome}${item.secundario.nome}`}
                    dados={item}
                    estatico
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </section>
      )}
    </>
  )
}
