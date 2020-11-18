import React, { FC, ComponentProps } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 6,
    marginBottom: 10,
    marginLeft: 6,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
  },
});

type Props = ComponentProps<typeof View>;

export const ChatStepContainer: FC<Props> = ({ style, children, ...props }) => {
  return (
    <View style={[styles.root, style]} {...props}>
      {children}
    </View>
  );
};

export default ChatStepContainer;
