import { useContext } from 'react';
import { FontGroupData } from '../types/FontGroupData'
import MostraNome from './mostraNome'
import { LocalStorageContext } from '../contexts/LocalStorageContext';

export default function ListaSalvos() {
  const { localStorageData } = useContext(LocalStorageContext);
  console.log('localStorageData')
  console.log(localStorageData)

  return (
    <section>
      <h1>LISTA SALVOS</h1>
      {localStorageData.dados.map((item: FontGroupData, index: number) => (
        <MostraNome
          key={`${index}${item.principal.nome}${item.secundario.nome}`}
          dados={item}
        />
      ))}
    </section>
  )
}
