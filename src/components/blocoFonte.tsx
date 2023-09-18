import { Grid, MenuItem, TextField, Typography } from '@mui/material'
import { MouseEvent, useEffect, useState } from 'react'
import { Fonte, Variante } from '../types/Fonte'

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
  fonteVariante: Variante
  setFonteVariante: React.Dispatch<React.SetStateAction<Variante>>
  form: string
}

export default function BlocoFonte({
  label,
  fontes,
  fonteSelecionada,
  setFonteSelecionada,
  variant = 'standard',
  nome,
  setNome,
  tamanho,
  setTamanho,
  fonteVariante,
  setFonteVariante,
  form,
}: Props) {
  const [tipoSelecionado, setTipoSelecionado] = useState<string>('')
  const [fontesFiltradas, setFontesFiltradas] = useState<Fonte[]>(fontes)
  const [tipos, setTipos] = useState<string[]>([])
  const [variantes, setVariantes] = useState<Variante[]>([])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    obtemVariantes()
  }, [fonteSelecionada])

  useEffect(() => {
    obtemFontesFiltradas()
  }, [tipoSelecionado])

  useEffect(() => {
    obtemTipos()
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  function obtemVariantes() {
    const fonte: Fonte = fontes.find(
      (item) => item.classe === fonteSelecionada
    )!
    const variantesArray = fonte.variantes
    setVariantes(variantesArray)
  }

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
        (item) => item.classe === fonteSelecionada
      )
      if (!estaNoGrupo) {
        setFonteSelecionada('')
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

  const obtemLabelVariante = (variante: Variante): string =>
    `${variante.weight} ${variante.description} ${
      variante.italic && !checkItalicInDescription(variante) ? 'italic' : ''
    }`

  const selecionaVariante = (_e: MouseEvent<HTMLLIElement, MouseEvent>, id: number) => {
    const objetoFonte = fontes.find(
      (fonte) => fonte.classe === fonteSelecionada
    )
    const varianteSelecionada = objetoFonte!.variantes.find((v) => v.id === id)
    setFonteVariante(varianteSelecionada)
  }

  const isVarianteEmpty = (): boolean => !!Object.keys(fonteVariante).length
  const RenderVariantes = () => {
    let varianteInicial = ''
    if (variantes.length) {
      const temRegular = variantes.find((variante) => {
        if (variante.weight === 400 && variante.italic === false) {
          return true
        }
        return false
      })
      if (!temRegular) {
        varianteInicial = obtemLabelVariante(variantes[0])
      } else {
        varianteInicial = obtemLabelVariante(temRegular)
      }
    }
    return (
      <TextField
        id="variantes"
        label="Variantes"
        select
        helperText="Variantes da fonte"
        variant={variant}
        value={
          isVarianteEmpty()
            ? obtemLabelVariante(fonteVariante)
            : varianteInicial
        }
        fullWidth
      >
        {variantes.map((variante) => {
          return (
            <MenuItem
              key={`${form} ${variante.id}`}
              value={obtemLabelVariante(variante)}
              onClick={(event) => selecionaVariante(event, variante.id)}
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
        {label}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="nome"
            defaultValue={nome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNome(e.target.value)
            }
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
            variant={variant}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTamanho(parseInt(e.target.value))
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <RenderVariantes />
        </Grid>
      </Grid>
    </>
  )
}
