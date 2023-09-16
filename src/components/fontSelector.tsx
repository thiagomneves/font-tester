import fontes from '../json/fontes.json'
import { useEffect, useState } from 'react'
import * as MostraNome from './mostraNome'
import BlocoFonte from './blocoFonte'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FontSizeAjuster from '../utils/fontSizeAjuster'

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
      <Button onClick={salvar} variant="contained">
        <AddIcon />
        &nbsp;Adicionar
      </Button>

      <MostraNome.Div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {nomePrincipal.trim() || nomeSecundario.trim() ? (
          <>
            <MostraNome.Span className={fonteSelecionadaPrincipal} tamanho={tamanhoPrincipal}>
              {nomePrincipal}
            </MostraNome.Span>
            <MostraNome.Span className={fonteSelecionadaSecundaria} tamanho={tamanhoSecundario}>
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
