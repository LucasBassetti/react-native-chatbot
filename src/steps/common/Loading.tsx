import React, { FC, ComponentProps } from 'react';
import { View, StyleSheet } from 'react-native';
import Bubbles from './Bubbles';

const styles = StyleSheet.create({
  root: {
    paddingTop: 6,
  },
  custom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface OwnProps {
  color: string;
  custom?: boolean;
}

type Props = ComponentProps<typeof View> & OwnProps;

export const Loading: FC<Props> = ({
  color,
  custom = false,
  style,
  children,
  ...props
}) => {
  return (
    <View style={[custom ? styles.custom : styles.root, style]} {...props}>
      <Bubbles size={3} color={color} />
    </View>
  );
};

export default Loading;
