import styled from 'styled-components/native';

const ImageContainer = styled.View`
  margin-top: 6;
  margin-right: 6;
  margin-bottom: 10;
  margin-left: 6;
  padding-top: 2;
  padding-right: 2;
  padding-bottom: 2;
  padding-left: 2;
  background-color: #fff;
  border-top-right-radius: 21;
  border-top-left-radius: 21;
  border-bottom-right-radius: ${props => props.user ? 21 : 0};
  border-bottom-left-radius: ${props => props.user ? 0 : 21};
  border-width: 1;
  border-color: #ddd;
`;

export default ImageContainer;
