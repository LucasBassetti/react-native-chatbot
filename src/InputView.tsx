import React, { FC, ComponentProps } from 'react';
import { KeyboardAvoidingView } from 'react-native';

type Props = ComponentProps<typeof KeyboardAvoidingView>;

export const InputView: FC<Props> = ({ children, ...props }) => (
  <KeyboardAvoidingView {...props}>{children}</KeyboardAvoidingView>
);

export default InputView;
