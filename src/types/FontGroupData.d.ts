import { Fonte, Variante } from "./Fonte"

export interface FontGroupData {
  id?: string
  principal: {
    nome: string
    fonte: Fonte
    tamanho: number
    cor: string
    variante: Variante
  }
  secundario: {
    nome: string
    fonte: Fonte
    tamanho: number
    cor: string
    variante: Variante
  }
  fundo: {
    cor: string
  }
}
