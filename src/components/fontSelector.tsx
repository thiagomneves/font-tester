import { useContext, useState } from 'react'
import { Button, Card, Grid } from '@mui/material'
import { ColorPicker } from 'material-ui-color'
import AddIcon from '@mui/icons-material/Add'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import fontes from '../json/fontes.json'
import { LocalStorageContext } from '../contexts/LocalStorageContext'
import MostraNome from './mostraNome'
import BlocoFonte from './blocoFonte'
import { FontGroupData } from '../types/FontGroupData'

const FontSelectorContainer = styled.div`
  padding: 30px;
`

export default function FontSelector() {
  const { localStorageData, setLocalStorageData } =
    useContext(LocalStorageContext)
  const [nomePrincipal, setNomePrincipal] = useState<string>('nome')
  const [nomeSecundario, setNomeSecundario] = useState<string>('')
  const [fonteSelecionadaPrincipal, setFonteSelecionadaPrincipal] =
    useState<string>('allerta')
  const [fonteSelecionadaSecundaria, setFonteSelecionadaSecundaria] =
    useState<string>('days-one')
  const [tamanhoPrincipal, setTamanhoPrincipal] = useState<number>(30)
  const [tamanhoSecundario, setTamanhoSecundario] = useState<number>(30)

  const salvar = (): void => {
    const novosDados: FontGroupData = {
      id: uuidv4(),
      principal: {
        nome: nomePrincipal,
        fonte: fonteSelecionadaPrincipal,
        tamanho: tamanhoPrincipal,
        cor: corPrincipal,
      },
      secundario: {
        nome: nomeSecundario,
        fonte: fonteSelecionadaSecundaria,
        tamanho: tamanhoSecundario,
        cor: corSecundaria,
      },
      fundo: {
        cor: corFundo,
      },
    }

    setLocalStorageData({
      ...localStorageData,
      dados: [...localStorageData.dados, novosDados],
    })
  }

  const [corPrincipal, setCorPrincipal] = useState('#000')
  const [corSecundaria, setCorSecundaria] = useState('#000')
  const [corFundo, setCorFundo] = useState('#fff')

  return (
    <>
      <Card variant="outlined">
        <FontSelectorContainer>
          <BlocoFonte
            label="Fonte Principal"
            fontes={fontes}
            fonteSelecionada={fonteSelecionadaPrincipal}
            setFonteSelecionada={setFonteSelecionadaPrincipal}
            nome={nomePrincipal}
            setNome={setNomePrincipal}
            tamanho={tamanhoPrincipal}
            setTamanho={setTamanhoPrincipal}
          />
          <BlocoFonte
            label="Fonte Secundaria"
            fontes={fontes}
            fonteSelecionada={fonteSelecionadaSecundaria}
            setFonteSelecionada={setFonteSelecionadaSecundaria}
            nome={nomeSecundario}
            setNome={setNomeSecundario}
            tamanho={tamanhoSecundario}
            setTamanho={setTamanhoSecundario}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <ColorPicker
                value={corPrincipal}
                onChange={(e) => setCorPrincipal(e.css.backgroundColor!)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ColorPicker
                value={corSecundaria}
                onChange={(e) => setCorSecundaria(e.css.backgroundColor!)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ColorPicker
                value={corFundo}
                onChange={(e) => setCorFundo(e.css.backgroundColor!)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                onClick={salvar}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Adicionar
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            marginTop={2}
          >
            <Grid item xs={12} sm={6}>
              <MostraNome
                dados={{
                  principal: {
                    nome: nomePrincipal,
                    fonte: fonteSelecionadaPrincipal,
                    tamanho: tamanhoPrincipal,
                    cor: corPrincipal,
                  },
                  secundario: {
                    nome: nomeSecundario,
                    fonte: fonteSelecionadaSecundaria,
                    tamanho: tamanhoSecundario,
                    cor: corSecundaria,
                  },
                  fundo: {
                    cor: corFundo,
                  },
                }}
              />
            </Grid>
          </Grid>
        </FontSelectorContainer>
      </Card>
    </>
  )
}
