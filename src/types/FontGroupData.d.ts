import { Fonte, Variante } from "./Fonte"

export interface FontGroupData {
  id?: string
  principal: {
    label: string
    fonte: Fonte
    tamanho: number
    cor: string
    variante: Variante
  }
  secundario: {
    label: string
    fonte: Fonte
    tamanho: number
    cor: string
    variante: Variante
  }
  fundo: {
    cor: string
  }
}
