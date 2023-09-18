import { Fonte, Variante } from "../types/Fonte"

export const varianteInicial = (fonte: Fonte): Variante => {
  const variantes = fonte.variantes
  let varianteInicial = {} as Variante
  if (variantes.length) {
    const temRegular = variantes.find((variante) => {
      if (variante.weight === 400 && variante.italic === false) {
        return true
      }
      return false
    })
    if (!temRegular) {
      varianteInicial = variantes[0]
    } else {
      varianteInicial = temRegular
    }
  }
  return varianteInicial
}
