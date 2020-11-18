import React, { forwardRef, ComponentProps } from 'react';
import { Animated } from 'react-native';
import { Circle } from 'react-native-svg';

interface OwnProps {
  radius: number;
}

type Props = ComponentProps<typeof Circle> & OwnProps;

const CircleSVG = forwardRef<Circle, Props>(({ radius, ...props }, ref) => (
  <Circle ref={ref as any} r={radius} {...props} />
));

export const AnimatedCircle = Animated.createAnimatedComponent(CircleSVG);

export default AnimatedCircle;
