import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import fontes from "../json/fontes.json";
import { useEffect, useState } from "react";
import * as MostraNome from "./mostraNome";
import BlocoFonte from "./blocoFonte";

export default function FontSelector() {
  const [nome, setNome] = useState<string>("");
  const [fonteSelecionada, setFonteSelecionada] = useState<string>("");

  return (
    <section>
      <BlocoFonte
        label="Fonte Principal"
        fontes={fontes}
        fonteSelecionada={fonteSelecionada}
        setFonteSelecionada={setFonteSelecionada}
        nome={nome}
        setNome={setNome}
      />

      <MostraNome.div className={fonteSelecionada}>
        <MostraNome.span>{nome}</MostraNome.span>
      </MostraNome.div>
    </section>
  );
}
