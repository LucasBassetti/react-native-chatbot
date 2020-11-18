import React, { FC, ComponentProps } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    borderRadius: 22,
  },
});

interface OwnProps {
  bubbleColor: string;
}

type Props = ComponentProps<typeof View> & OwnProps;

export const OptionElement: FC<Props> = ({
  bubbleColor,
  style,
  children,
  ...props
}) => (
  <View
    style={[styles.root, style, { backgroundColor: bubbleColor }]}
    {...props}
  >
    {children}
  </View>
);

export default OptionElement;
