import React, { FC, ComponentProps } from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    height: 40,
    width: 40,
    borderRadius: 21,
  },
});

type Props = ComponentProps<typeof Image>;

export const Img: FC<Props> = ({ style, children, ...props }) => (
  <Image style={[styles.root, style]} {...props}>
    {children}
  </Image>
);

export default Img;
