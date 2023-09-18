import { Variante } from "./Fonte"

export interface FontGroupData {
  id?: string
  principal: {
    nome: string
    fonte: string
    tamanho: number
    cor: string
    variante: Variante
  }
  secundario: {
    nome: string
    fonte: string
    tamanho: number
    cor: string
    variante: Variante
  }
  fundo: {
    cor: string
  }
}
