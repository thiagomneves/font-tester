import {
  Autocomplete,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { MouseEvent, useEffect, useState } from 'react'
import { Fonte, Variante } from '../types/Fonte'
import { varianteInicial } from '../utils/varianteInicial'

interface Props {
  labelBloco: string
  fontes: Fonte[]
  fonteSelecionada: Fonte
  setFonteSelecionada: React.Dispatch<React.SetStateAction<Fonte>>
  variant?: 'standard' | 'outlined' | 'filled'
  label: string
  setLabel: React.Dispatch<React.SetStateAction<string>>
  tamanho: number
  setTamanho: React.Dispatch<React.SetStateAction<number>>
  fonteVariante: Variante
  setFonteVariante: React.Dispatch<React.SetStateAction<Variante>>
  form: string
}

export default function BlocoFonte({
  labelBloco,
  fontes,
  fonteSelecionada,
  setFonteSelecionada,
  variant = 'standard',
  label,
  setLabel,
  tamanho,
  setTamanho,
  fonteVariante,
  setFonteVariante,
  form,
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

  function obtemTipos(): void {
    const tiposUnicos = new Set<string>()
    fontes.forEach((fonte: Fonte) => tiposUnicos.add(fonte.tipo))
    setTipos(['todos', ...tiposUnicos])
    if (!tipoSelecionado.trim()) {
      setTipoSelecionado('todos')
    }
  }

  function obtemFontesFiltradas(): void {
    if (tipoSelecionado.trim() && tipoSelecionado.trim() != 'todos') {
      const novaFontes = fontes.filter(
        (fonte: Fonte) => fonte.tipo === tipoSelecionado
      )
      setFontesFiltradas([...novaFontes])
      const estaNoGrupo = novaFontes.find(
        (item) => item.classe === fonteSelecionada.classe
      )
      if (!estaNoGrupo) {
        setFonteSelecionada(novaFontes[0])
      }
    } else {
      setFontesFiltradas([...fontes])
    }
  }

  function selecionaTipo(e: React.ChangeEvent<HTMLInputElement>): void {
    setTipoSelecionado(e.target.value)
  }

  const checkItalicInDescription = (variante: Variante): boolean =>
    variante.description.toLowerCase().includes('italic')

  const obtemLabelVariante = (variante: Variante): string => {
    return `${variante.weight} ${variante.description}${
      variante.italic && !checkItalicInDescription(variante) ? ' italic' : ''
    }`
  }

  const handleSelecionaVariante = (_e: MouseEvent, id: number) => {
    const varianteSelecionada = fonteSelecionada.variantes.find(
      (v) => v.id === id
    )
    setFonteVariante(varianteSelecionada)
  }

  const handleSelecionaFonte = (_, fonte: Fonte) => {
    setFonteSelecionada(fonte)
    setFonteVariante(varianteInicial(fonte))
  }

  const RenderVariantes = () => {
    return (
      <TextField
        id="variantes"
        label="Variantes"
        select
        helperText="Variantes da fonte"
        variant={variant}
        value={obtemLabelVariante(fonteVariante)}
        fullWidth
      >
        {fonteSelecionada.variantes.map((variante) => {
          return (
            <MenuItem
              key={`${form} ${variante.id}`}
              value={obtemLabelVariante(variante)}
              onClick={(event: MouseEvent) =>
                handleSelecionaVariante(event, variante.id)
              }
            >
              {obtemLabelVariante(variante)}
            </MenuItem>
          )
        })}
      </TextField>
    )
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {labelBloco}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="nome"
            defaultValue={label}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLabel(e.target.value)
            }
            label="Nome"
            variant={variant}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            disablePortal
            id="fonte"
            options={fontesFiltradas}
            getOptionLabel={(option) => option.label}
            value={fonteSelecionada}
            renderOption={(_e, fonte) => {
              return (
                <MenuItem
                  key={fonte.label}
                  value={fonte.classe}
                  onClick={(e) => handleSelecionaFonte(e, fonte)}
                >
                  <span className={fonte.classe}>{label.trim() ? label + ' - ': ''}{fonte.label}</span>
                </MenuItem>
              )
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Fonte"
                helperText="Selecione uma Fonte"
                variant={variant}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
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
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <TextField
            id="outlined-number"
            label="Tamanho"
            type="number"
            value={tamanho.toString()}
            variant={variant}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTamanho(parseInt(e.target.value))
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          {Object.keys(fonteSelecionada.variantes).length && (
            <RenderVariantes />
          )}
        </Grid>
      </Grid>
    </>
  )
}
