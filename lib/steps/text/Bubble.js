import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const maxWidth = width * 0.6;
const defRadius = 18;


const Bubble = styled.View`
  background-color: ${props => props.bubbleColor};
  border-top-left-radius: ${(props) => {
    const { isFirst, isLast, user, style } = props;
    const radius = style.borderTopLeftRadius || style.borderRadius;
    if (!isFirst && !isLast) {
      return user ? radius || defRadius : 0;
    } else if (!isFirst && isLast) {
      return user ? radius || defRadius : 0;
    }
    return radius || defRadius;
  }};
  border-top-right-radius: ${(props) => {
    const { isFirst, isLast, user, style } = props;
    const radius = style.borderTopRightRadius || style.borderRadius;
    if (!isFirst && !isLast) {
      return user ? 0 : radius || defRadius;
    } else if (!isFirst && isLast) {
      return user ? 0 : radius || defRadius;
    }
    return radius || defRadius;
  }};
  border-bottom-right-radius: ${(props) => {
    const { isFirst, isLast, user, style } = props;
    const radius = style.borderBottomRightRadius || style.borderRadius;
    if (!isFirst && !isLast) {
      return user ? 0 : radius || defRadius;
    } else if (!isFirst && isLast) {
      return radius || defRadius;
    }
    return props.user ? 0 : radius || defRadius;
  }};
  border-bottom-left-radius: ${(props) => {
    const { isFirst, isLast, user, style } = props;
    const radius = style.borderBottomLeftRadius || style.borderRadius;
    if (!isFirst && !isLast) {
      return user ? radius || defRadius : 0;
    } else if (!isFirst && isLast) {
      return radius || defRadius;
    }
    return props.user ? radius || defRadius : 0;
  }};
  padding-top: ${({ style }) => style.paddingTop || style.padding || 12};
  padding-bottom: ${({ style }) => style.paddingTop || style.padding || 12};
  padding-left: ${({ style }) => style.paddingTop || style.padding || 12};
  padding-right: ${({ style }) => style.paddingTop || style.padding || 12};
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

    return 12;
  }};
  margin-bottom: 10;
  margin-left: ${(props) => {
    const { isFirst, showAvatar, user } = props;
    if (!isFirst && showAvatar) {
      return user ? 12 : 58;
    } else if (showAvatar) {
      return 0;
    }

    return 12;
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
