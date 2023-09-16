import { useContext } from 'react'
import { Grid, Typography } from '@mui/material'
import { LocalStorageContext } from '../contexts/LocalStorageContext'
import MostraNome from './mostraNome'

export default function ListaSalvos() {
  const { localStorageData } = useContext(LocalStorageContext)

  return (
    <>
      {!!localStorageData.dados?.length && (
        <section>
          <Typography variant="h4" align="center" marginTop={10}>
            LISTA SALVOS
          </Typography>
          <Grid container spacing={0}>
            {localStorageData.dados.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} xl={3} key={`item${index}`}>
                <MostraNome
                  key={`${index}${item.principal.nome}${item.secundario.nome}`}
                  dados={item}
                  estatico
                />
              </Grid>
            ))}
          </Grid>
        </section>
      )}
    </>
  )
}
