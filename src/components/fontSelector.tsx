import fontes from '../json/fontes.json'
import { useState } from 'react'
import * as MostraNome from './mostraNome'
import BlocoFonte from './blocoFonte'
import { Button, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { ColorPicker } from 'material-ui-color'

export default function FontSelector() {
  const [nomePrincipal, setNomePrincipal] = useState<string>('unya')
  const [nomeSecundario, setNomeSecundario] = useState<string>('tech')
  const [fonteSelecionadaPrincipal, setFonteSelecionadaPrincipal] =
    useState<string>('cormorant')
  const [fonteSelecionadaSecundaria, setFonteSelecionadaSecundaria] =
    useState<string>('days-one')
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [tamanhoPrincipal, setTamanhoPrincipal] = useState<number>(80)
  const [tamanhoSecundario, setTamanhoSecundario] = useState<number>(80)

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>): void => {
    const x = e.clientX
    const y = e.clientY
    setTooltipPosition({ x, y })
    setIsVisible(true)
  }

  const handleMouseOut = (): void => {
    setIsVisible(false)
  }

  const salvar = (): void => {
    console.log('clicou salvar')
  }

  const [corPrimaria, setCorPrimaria] = useState('#000')
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
            value={corPrimaria}
            onChange={(e) => setCorPrimaria(e.css.backgroundColor!)}
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

      <MostraNome.Div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        $cor={corFundo}
      >
        {nomePrincipal.trim() || nomeSecundario.trim() ? (
          <>
            <MostraNome.Span
              className={fonteSelecionadaPrincipal}
              $tamanho={tamanhoPrincipal}
              $cor={corPrimaria}
            >
              {nomePrincipal}
            </MostraNome.Span>
            <MostraNome.Span
              className={fonteSelecionadaSecundaria}
              $tamanho={tamanhoSecundario}
              $cor={corSecundaria}
            >
              {nomeSecundario}
            </MostraNome.Span>
          </>
        ) : (
          <MostraNome.Span>&nbsp;</MostraNome.Span>
        )}
      </MostraNome.Div>
      {isVisible && (
        <MostraNome.Tooltip
          style={{
            position: 'absolute',
            top: `${tooltipPosition.y + 10}px`, // Ajuste a posição vertical como desejar
            left: `${tooltipPosition.x + 10}px`, // Ajuste a posição horizontal como desejar
          }}
        >
          Conteúdo do Tooltip
        </MostraNome.Tooltip>
      )}
    </section>
  )
}
