import styled from 'styled-components/native';

const TextStepContainer = styled.View`
  display: flex;
  flex-direction: ${props => props.user ? 'row-reverse' : 'row'};;
  align-items: flex-end;
  width: 100%;
`;

export default TextStepContainer;
