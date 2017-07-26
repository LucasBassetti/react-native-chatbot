import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const maxWidth = width * 0.6;

const Bubble = styled.View`
  background-color: ${props => props.bubbleColor};
  border-top-left-radius: ${(props) => {
    const { isFirst, isLast, user } = props;
    if (!isFirst && !isLast) {
      return user ? 18 : 0;
    } else if (!isFirst && isLast) {
      return user ? 18 : 0;
    }
    return 18;
  }};
  border-top-right-radius: ${(props) => {
    const { isFirst, isLast, user } = props;
    if (!isFirst && !isLast) {
      return user ? 0 : 18;
    } else if (!isFirst && isLast) {
      return user ? 0 : 18;
    }
    return 18;
  }};
  border-bottom-right-radius: ${(props) => {
    const { isFirst, isLast, user } = props;
    if (!isFirst && !isLast) {
      return user ? 0 : 18;
    } else if (!isFirst && isLast) {
      return 18;
    }
    return props.user ? 0 : 18;
  }};
  border-bottom-left-radius: ${(props) => {
    const { isFirst, isLast, user } = props;
    if (!isFirst && !isLast) {
      return user ? 18 : 0;
    } else if (!isFirst && isLast) {
      return 18;
    }
    return props.user ? 18 : 0;
  }};
  padding-top: 12;
  padding-bottom: 12;
  padding-left: 12;
  padding-right: 12;
  margin-top: ${(props) => {
    const { isFirst, showAvatar } = props;
    if (!isFirst && showAvatar) {
      return -8;
    } else if (!isFirst && !showAvatar) {
      return -8;
    }

    return 0;
  }};
  margin-right: ${(props) => {
    const { isFirst, showAvatar, user } = props;
    if (!isFirst && showAvatar) {
      return user ? 58 : 6;
    } else if (showAvatar) {
      return 0;
    }

    return 6;
  }};
  margin-bottom: 10;
  margin-left: ${(props) => {
    const { isFirst, showAvatar, user } = props;
    if (!isFirst && showAvatar) {
      return user ? 6 : 58;
    } else if (showAvatar) {
      return 0;
    }

    return 6;
  }};
  max-width: ${(props) => {
    const { isFirst, showAvatar } = props;
    if (!isFirst && showAvatar) {
      return maxWidth + 58;
    }

    return maxWidth;
  }};
  min-height: 42px;
`;

export default Bubble;
