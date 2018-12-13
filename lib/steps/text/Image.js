import styled from 'styled-components/native';

const Img = styled.Image`
  height: ${props => props.height || 40};
  width: ${props => props.height || 40};
`;

export default Img;
