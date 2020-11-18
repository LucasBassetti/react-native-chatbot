import React, { FC, ComponentProps } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    paddingRight: 6,
    paddingLeft: 6,
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

type Props = ComponentProps<typeof View>;

export const Options: FC<Props> = ({ style, children, ...props }) => (
  <View style={[styles.root, style]} {...props}>
    {children}
  </View>
);

export default Options;
