export interface Variante {
  weight: number
  description: string
  italic: boolean
  id: number
}

export interface Fonte {
  label: string
  tipo: string
  classe: string
  variantes: Variantes[]
}
