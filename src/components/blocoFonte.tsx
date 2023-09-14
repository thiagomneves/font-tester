import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Fonte {
  nome: string;
  tipo: string;
  classe: string;
}

interface Props {
  label: string;
  fontes: Fonte[];
  fonteSelecionada: string;
  setFonteSelecionada: React.Dispatch<React.SetStateAction<string>>;
  variant?: "standard" | "outlined" | "filled";
  nome: string;
  setNome: React.Dispatch<React.SetStateAction<string>>;
}

export default function BlocoFonte({
  label,
  fontes,
  fonteSelecionada,
  setFonteSelecionada,
  variant = "outlined",
  nome,
  setNome,
}: Props) {
  const [tipoSelecionado, setTipoSelecionado] = useState<string>("");
  const [fontesFiltradas, setFontesFiltradas] = useState<Fonte[]>(fontes);
  const [tipos, setTipos] = useState<string[]>([]);

  useEffect(() => {
    obtemFontesFiltradas();
  }, [tipoSelecionado]);

  useEffect(() => {
    obtemTipos();
  }, []);

  function obtemTipos() {
    const tiposUnicos = new Set<string>();
    fontes.forEach((fonte: Fonte) => tiposUnicos.add(fonte.tipo));
    setTipos(["", ...tiposUnicos]);
  }

  function obtemFontesFiltradas() {
    if (tipoSelecionado.trim()) {
      const novaFontes = fontes.filter(
        (fonte: Fonte) => fonte.tipo === tipoSelecionado
      );
      setFontesFiltradas([...novaFontes]);
    } else {
      setFontesFiltradas([...fontes]);
    }
  }

  function selecionaTipo(e: React.ChangeEvent<HTMLInputElement>) {
    setTipoSelecionado(e.target.value);
    setFonteSelecionada("");
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
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
            onChange={selecionaTipo}
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
    </>
  );
}
