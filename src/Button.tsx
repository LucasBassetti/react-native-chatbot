import React, { FC, ComponentProps } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    height: 50,
    width: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface OwnProps {
  backgroundColor?: string;
  disabled?: boolean;
  invalid?: boolean;
}

type Props = ComponentProps<typeof TouchableOpacity> & OwnProps;

export const Button: FC<Props> = ({
  backgroundColor,
  disabled,
  invalid,
  style,
  children,
  ...props
}) => {
  const color =
    disabled && !invalid ? '#ddd' : invalid ? '#E53935' : backgroundColor;
  return (
    <TouchableOpacity
      style={[styles.root, style, { backgroundColor: color }]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;
