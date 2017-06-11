import styled from 'styled-components/native';

const Button = styled.Text`
  color: ${props => props.invalid ? '#FFF' : props.fontColor};
`;

export default Button;
