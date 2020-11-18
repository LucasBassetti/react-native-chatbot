import React, { FC, ComponentProps } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
});

interface OwnProps {
  user: boolean;
}

type Props = ComponentProps<typeof View> & OwnProps;

export const TextStepContainer: FC<Props> = ({
  user,
  style,
  children,
  ...props
}) => (
  <View
    style={[
      styles.root,
      style,
      { flexDirection: user ? 'row-reverse' : 'row' },
    ]}
    {...props}
  >
    {children}
  </View>
);

export default TextStepContainer;
