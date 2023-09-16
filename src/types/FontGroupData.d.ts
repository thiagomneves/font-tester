export interface FontGroupData {
  id?: string
  principal: {
    nome: string
    fonte: string
    tamanho: number
    cor: string
  }
  secundario: {
    nome: string
    fonte: string
    tamanho: number
    cor: string
  }
  fundo: {
    cor: string
  }
}
