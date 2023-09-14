import fontes from "../json/fontes.json";
import { useState } from "react";
import * as MostraNome from "./mostraNome";
import BlocoFonte from "./blocoFonte";

export default function FontSelector() {
  const [nomePrincipal, setNomePrincipal] = useState<string>("");
  const [nomeSecundario, setNomeSecundario] = useState<string>("");
  const [fonteSelecionadaPrincipal, setFonteSelecionadaPrincipal] = useState<string>("");
  const [fonteSelecionadaSecundaria, setFonteSelecionadaSecundaria] = useState<string>("");

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
        label="Fonte Principal"
        fontes={fontes}
        fonteSelecionada={fonteSelecionadaSecundaria}
        setFonteSelecionada={setFonteSelecionadaSecundaria}
        nome={nomeSecundario}
        setNome={setNomeSecundario}
      />

      <MostraNome.div >
        <MostraNome.span className={fonteSelecionadaPrincipal}>{nomePrincipal}</MostraNome.span>
        <MostraNome.span className={fonteSelecionadaSecundaria}>{nomeSecundario}</MostraNome.span>
      </MostraNome.div>
    </section>
  );
}
