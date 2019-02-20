import styled from 'styled-components/native';

const Button = styled.Text`
  color: ${props => props.invalid ? '#FFF' : props.fontColor};
  fontSize: ${props => props.fontSize !== undefined ? props.fontSize : 14 };
`;

export default Button;
