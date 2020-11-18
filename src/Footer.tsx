import React, { FC, ComponentProps } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

interface OwnProps {
  color?: string;
  disabled?: boolean;
  invalid?: boolean;
}

type Props = ComponentProps<typeof View> & OwnProps;

export const Footer: FC<Props> = ({
  color,
  disabled,
  invalid,
  style,
  children,
  ...props
}) => {
  const backgroundColor =
    disabled && !invalid ? '#ddd' : invalid ? '#E53935' : color;
  return (
    <View style={[styles.root, style, { backgroundColor }]} {...props}>
      {children}
    </View>
  );
};

export default Footer;
