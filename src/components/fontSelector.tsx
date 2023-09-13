import { Grid, MenuItem, TextField } from "@mui/material";
import fontes from "../json/fontes.json";
import { useEffect, useState } from "react";

interface Fonte {
  nome: string;
  tipo: string;
  classe: string;
}

export default function FontSelector() {
  const variant = "outlined";
  const [nome, setNome] = useState<string>("");
  const [fonteSelecionada, setFonteSelecionada] = useState<string>("");
  const [fontesFiltradas, setFontesFiltradas] = useState<Fonte[]>(fontes);
  const [tipoSelecionado, setTipoSelecionado] = useState<string>("");
  const [tipos, setTipos] = useState<string[]>([]);

  useEffect(() => {
    obtemTipos();
  }, []);

  useEffect(() => {
    obtemFontesFiltradas();
  }, [tipoSelecionado]);

  function obtemTipos() {
    const tiposUnicos = new Set<string>();
    fontes.forEach((fonte) => tiposUnicos.add(fonte.tipo));
    setTipos(["", ...tiposUnicos]);
  }

  function obtemFontesFiltradas() {
    if (tipoSelecionado.trim()) {
      const novaFontes = fontes.filter(
        (fonte) => fonte.tipo === tipoSelecionado
      );
      setFontesFiltradas([...novaFontes]);
    } else {
      setFontesFiltradas([...fontes]);
    }
  }

  return (
    <section>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="nome"
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
            label="Nome"
            variant={variant}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="fonte"
            select
            value={fonteSelecionada}
            helperText="Selecione uma Fonte"
            label="Fonte"
            variant={variant}
            onChange={(e) => setFonteSelecionada(e.target.value)}
            fullWidth
          >
            {fontesFiltradas.map((fonte) => (
              <MenuItem key={fonte.nome} value={fonte.classe}>
                <span className={fonte.classe}>{fonte.nome}</span>
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="tipo"
            select
            defaultValue=""
            value={tipoSelecionado}
            helperText="Filtrar por tipo"
            label="Tipo"
            variant={variant}
            onChange={(e) => setTipoSelecionado(e.target.value)}
            fullWidth
          >
            {tipos.map((tipo) => (
              <MenuItem key={tipo} value={tipo}>
                {tipo === "" ? "Todos..." : tipo}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <span className={fonteSelecionada}>{nome}</span>
    </section>
  );
}
