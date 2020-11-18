import React, { FC, ComponentProps } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const maxWidth = width * 0.6;

const styles = StyleSheet.create({
  root: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 10,
    minHeight: '42px',
  },
});

interface OwnProps {
  bubbleColor: string;
  isFirst: boolean;
  isLast: boolean;
  user: boolean;
  showAvatar: boolean;
}

type Props = ComponentProps<typeof View> & OwnProps;

export const Bubble: FC<Props> = ({
  bubbleColor,
  isFirst,
  isLast,
  user,
  showAvatar,
  style,
  children,
  ...props
}) => {
  // const notFirstNotLast = !isFirst && !isLast;
  // const notFirstIsLast = !isFirst && isLast;
  // const borderTopLeftRadius =
  //   (notFirstNotLast || notFirstIsLast) && user ? 18 : 0;
  // const borderTopRightRadius =
  //   (notFirstNotLast || notFirstIsLast) && user ? 0 : 18;
  const marginLeft =
    !isFirst && showAvatar ? (user ? 6 : 58) : showAvatar ? 0 : 6;
  const marginRight =
    !isFirst && showAvatar ? (user ? 58 : 6) : showAvatar ? 0 : 6;

  return (
    <View
      style={[
        styles.root,
        style,
        {
          backgroundColor: bubbleColor,
          marginLeft,
          marginRight,
          maxWidth: !isFirst && showAvatar ? maxWidth + 58 : maxWidth,
        },
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

// const Bubble1 = styled.View`
//   background-color: ${props => props.bubbleColor};
//   border-top-left-radius: ${props => {
//     const { isFirst, isLast, user } = props;
//     if (!isFirst && !isLast) {
//       return user ? 18 : 0;
//     } else if (!isFirst && isLast) {
//       return user ? 18 : 0;
//     }
//     return 18;
//   }};
//   border-top-right-radius: ${props => {
//     const { isFirst, isLast, user } = props;
//     if (!isFirst && !isLast) {
//       return user ? 0 : 18;
//     } else if (!isFirst && isLast) {
//       return user ? 0 : 18;
//     }
//     return 18;
//   }};
//   border-bottom-right-radius: ${props => {
//     const { isFirst, isLast, user } = props;
//     if (!isFirst && !isLast) {
//       return user ? 0 : 18;
//     } else if (!isFirst && isLast) {
//       return 18;
//     }
//     return props.user ? 0 : 18;
//   }};
//   border-bottom-left-radius: ${props => {
//     const { isFirst, isLast, user } = props;
//     if (!isFirst && !isLast) {
//       return user ? 18 : 0;
//     } else if (!isFirst && isLast) {
//       return 18;
//     }
//     return props.user ? 18 : 0;
//   }};
//   padding-top: 12;
//   padding-bottom: 12;
//   padding-left: 12;
//   padding-right: 12;
//   margin-top: ${props => {
//     const { isFirst, showAvatar } = props;
//     if (!isFirst && showAvatar) {
//       return -8;
//     } else if (!isFirst && !showAvatar) {
//       return -8;
//     }

//     return 0;
//   }};
//   margin-right: ${props => {
//     const { isFirst, showAvatar, user } = props;
//     if (!isFirst && showAvatar) {
//       return user ? 58 : 6;
//     } else if (showAvatar) {
//       return 0;
//     }

//     return 6;
//   }};
//   margin-bottom: 10;
//   margin-left: ${props => {
//     const { isFirst, showAvatar, user } = props;
//     if (!isFirst && showAvatar) {
//       return user ? 6 : 58;
//     } else if (showAvatar) {
//       return 0;
//     }

//     return 6;
//   }};
//   max-width: ${props => {
//     const { isFirst, showAvatar } = props;
//     if (!isFirst && showAvatar) {
//       return maxWidth + 58;
//     }

//     return maxWidth;
//   }};
//   min-height: 42px;
// `;

export default Bubble;
