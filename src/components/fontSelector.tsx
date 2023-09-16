import fontes from '../json/fontes.json'
import { useState } from 'react'
import MostraNome from './mostraNome'
import BlocoFonte from './blocoFonte'
import { Button, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { ColorPicker } from 'material-ui-color'

export default function FontSelector() {
  const [nomePrincipal, setNomePrincipal] = useState<string>('nome')
  const [nomeSecundario, setNomeSecundario] = useState<string>('')
  const [fonteSelecionadaPrincipal, setFonteSelecionadaPrincipal] =
    useState<string>('cormorant')
  const [fonteSelecionadaSecundaria, setFonteSelecionadaSecundaria] =
    useState<string>('days-one')
  const [tamanhoPrincipal, setTamanhoPrincipal] = useState<number>(80)
  const [tamanhoSecundario, setTamanhoSecundario] = useState<number>(80)



  const salvar = (): void => {
    const dados = {
      principal: {
        nome: nomePrincipal,
        fonte: fonteSelecionadaPrincipal,
        tamanho: tamanhoPrincipal,
        cor: corPrincipal
      },
      secundario: {
        nome: nomeSecundario,
        fonte: fonteSelecionadaSecundaria,
        tamanho: tamanhoSecundario,
        cor: corSecundaria
      },
      fundo: {
        cor: corFundo
      }
    }
    console.log(dados)
    console.log(dados.principal, dados.secundario, dados.fundo)
  }

  const [corPrincipal, setCorPrincipal] = useState('#000')
  const [corSecundaria, setCorSecundaria] = useState('#000')
  const [corFundo, setCorFundo] = useState('#fff')

  return (
    <section>
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
          <Button onClick={salvar} variant="contained">
            <AddIcon />
            &nbsp;Adicionar
          </Button>
        </Grid>
      </Grid>

      <MostraNome dados={{
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
        cor: corSecundaria
      },
      fundo: {
        cor: corFundo
      }
    }}/>
    </section>
  )
}
