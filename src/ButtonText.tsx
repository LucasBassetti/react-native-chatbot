import React, { FC, ComponentProps } from 'react';
import { Text } from 'react-native';

interface OwnProps {
  fontColor?: string;
  invalid?: boolean;
}

type Props = ComponentProps<typeof Text> & OwnProps;

export const ButtonText: FC<Props> = ({
  fontColor,
  invalid,
  style,
  children,
  ...props
}) => {
  const color = invalid ? '#FFF' : fontColor;
  return (
    <Text style={[{ color }]} {...props}>
      {children}
    </Text>
  );
};

export default ButtonText;
