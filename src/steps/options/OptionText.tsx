import React, { FC, ComponentProps } from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    fontSize: 14,
  },
});

interface OwnProps {
  fontColor: string;
}

type Props = ComponentProps<typeof Text> & OwnProps;

export const OptionText: FC<Props> = ({
  fontColor,
  style,
  children,
  ...props
}) => (
  <Text style={[styles.root, style, { color: fontColor }]} {...props}>
    {children}
  </Text>
);

export default OptionText;
