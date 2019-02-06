import styled from 'styled-components/native';

const TextMessage = styled.Text`
  color: ${props => props.fontColor};
  font-size: ${props => props.fontSize};
`;

export default TextMessage;
