import styled from 'styled-components'

export const Div = styled.div<{ $cor: string }>`
  margin: 40px;
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: ${props => props.$cor}
`
export const Span = styled.span<{ $tamanho?: number; $cor: string }>`
  font-size: ${props => props.$tamanho}px;
  color: ${props => props.$cor}
`

export const Tooltip = styled.div`
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
`;

