import fontes from '../json/fontes.json'
import { useState } from 'react'
import * as MostraNome from './mostraNome'
import BlocoFonte from './blocoFonte'

export default function FontSelector() {
  const [nomePrincipal, setNomePrincipal] = useState<string>('')
  const [nomeSecundario, setNomeSecundario] = useState<string>('')
  const [fonteSelecionadaPrincipal, setFonteSelecionadaPrincipal] =
    useState<string>('')
  const [fonteSelecionadaSecundaria, setFonteSelecionadaSecundaria] =
    useState<string>('')
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
    <section>
      <BlocoFonte
        label="Fonte Principal"
        fontes={fontes}
        fonteSelecionada={fonteSelecionadaPrincipal}
        setFonteSelecionada={setFonteSelecionadaPrincipal}
        nome={nomePrincipal}
        setNome={setNomePrincipal}
      />
      <BlocoFonte
        label="Fonte Secundaria"
        fontes={fontes}
        fonteSelecionada={fonteSelecionadaSecundaria}
        setFonteSelecionada={setFonteSelecionadaSecundaria}
        nome={nomeSecundario}
        setNome={setNomeSecundario}
      />

      <MostraNome.Div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {nomePrincipal.trim() || nomeSecundario.trim() ? (
          <>
            <MostraNome.Span className={fonteSelecionadaPrincipal}>
              {nomePrincipal}
            </MostraNome.Span>
            <MostraNome.Span className={fonteSelecionadaSecundaria}>
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
