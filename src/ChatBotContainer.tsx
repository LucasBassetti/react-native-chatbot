import React, { FC, ComponentProps } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f5f8fb',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },
});

type Props = ComponentProps<typeof View>;

export const ChatBotContainer: FC<Props> = ({ style, children, ...props }) => (
  <View style={[styles.root, style]} {...props}>
    {children}
  </View>
);

export default ChatBotContainer;
