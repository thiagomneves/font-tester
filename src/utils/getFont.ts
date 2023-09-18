import { Fonte } from '../types/Fonte'
import fontes from '../json/fontes.json'
import { criarSlug } from './criaSlug'

export const getFontByName = (fontName: string): Fonte => {
  const fonte = fontes.find(item => item.classe === criarSlug(fontName))
  if (typeof fonte !== 'undefined') {
    return fonte
  } else {
    return {} as Fonte
  }
}

export const getFontByClass = (fontClass: string): Fonte => {
  const fonte = fontes.find(item => item.classe === fontClass)
  if (typeof fonte !== 'undefined') {
    return fonte
  } else {
    return {} as Fonte
  }
}
