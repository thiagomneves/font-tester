import styled from 'styled-components'

export const Div = styled.div`
  margin: 40px;
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
`

export const Span = styled.span`
  font-size: ${props => props.tamanho}px;
`

export const Tooltip = styled.div`
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
`;

