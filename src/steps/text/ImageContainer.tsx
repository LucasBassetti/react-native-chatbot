import React, { FC, ComponentProps } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    marginTop: 6,
    marginRight: 6,
    marginBottom: 10,
    marginLeft: 6,
    paddingTop: 2,
    paddingRight: 2,
    paddingBottom: 2,
    paddingLeft: 2,
    backgroundColor: '#fff',
    borderTopRightRadius: 21,
    borderTopLeftRadius: 21,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 21,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

interface OwnProps {
  borderColor: string;
  user: boolean;
}

type Props = ComponentProps<typeof View> & OwnProps;

export const ImageContainer: FC<Props> = ({
  borderColor,
  user,
  style,
  children,
  ...props
}) => (
  <View
    style={[
      styles.root,
      style,
      {
        borderColor,
        borderBottomRightRadius: user ? 21 : 0,
        borderBottomLeftRadius: user ? 0 : 21,
      },
    ]}
    {...props}
  >
    {children}
  </View>
);

export default ImageContainer;
