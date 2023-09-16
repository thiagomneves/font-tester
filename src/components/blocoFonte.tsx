import { Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

interface Fonte {
  nome: string
  tipo: string
  classe: string
}

interface Props {
  label: string
  fontes: Fonte[]
  fonteSelecionada: string
  setFonteSelecionada: React.Dispatch<React.SetStateAction<string>>
  variant?: 'standard' | 'outlined' | 'filled'
  nome: string
  setNome: React.Dispatch<React.SetStateAction<string>>
  tamanho: number
  setTamanho: React.Dispatch<React.SetStateAction<number>>
}

export default function BlocoFonte({
  label,
  fontes,
  fonteSelecionada,
  setFonteSelecionada,
  variant = 'outlined',
  nome,
  setNome,
  tamanho,
  setTamanho
}: Props) {
  const [tipoSelecionado, setTipoSelecionado] = useState<string>('')
  const [fontesFiltradas, setFontesFiltradas] = useState<Fonte[]>(fontes)
  const [tipos, setTipos] = useState<string[]>([])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    obtemFontesFiltradas()
  }, [tipoSelecionado])

  useEffect(() => {
    obtemTipos()
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  function obtemTipos() {
    const tiposUnicos = new Set<string>()
    fontes.forEach((fonte: Fonte) => tiposUnicos.add(fonte.tipo))
    setTipos(['todos', ...tiposUnicos])
    if (!tipoSelecionado.trim()) {
      setTipoSelecionado('todos')
    }
  }

  function obtemFontesFiltradas() {
    if (tipoSelecionado.trim() && tipoSelecionado.trim() != 'todos') {
      const novaFontes = fontes.filter(
        (fonte: Fonte) => fonte.tipo === tipoSelecionado
      )
      setFontesFiltradas([...novaFontes])
      const estaNoGrupo = novaFontes.find(item => item.classe === fonteSelecionada)
      if (!estaNoGrupo) {
        setFonteSelecionada('')
      }
    } else {
      setFontesFiltradas([...fontes])
    }
  }

  function selecionaTipo(e: React.ChangeEvent<HTMLInputElement>) {
    setTipoSelecionado(e.target.value)
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
            label="Nome"
            variant={variant}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
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
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="tipo"
            label="Tipo"
            select
            value={tipoSelecionado}
            helperText="Filtrar por tipo"
            variant={variant}
            onChange={selecionaTipo}
            fullWidth

          >
            {tipos.map((tipo) => (
              <MenuItem key={tipo} value={tipo}>
                {tipo === 'todos' ? 'Todos...' : tipo}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            id="outlined-number"
            label="Tamanho"
            type="number"
            value={tamanho.toString()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTamanho(parseInt(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}
