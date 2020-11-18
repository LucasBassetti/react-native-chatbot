import React, { FC, ComponentProps } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    marginTop: 2,
    marginRight: 2,
    marginBottom: 2,
    marginLeft: 2,
  },
});

type Props = ComponentProps<typeof TouchableOpacity>;

export const Option: FC<Props> = ({ style, children, ...props }) => (
  <TouchableOpacity style={[styles.root, style]} {...props}>
    {children}
  </TouchableOpacity>
);

export default Option;
