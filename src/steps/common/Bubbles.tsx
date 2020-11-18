import React, { Component } from 'react';
import { Animated } from 'react-native';
import { Svg } from 'react-native-svg';
import Circle from './Circle';

interface Props {
  size: number;
  color: string;
  spaceBetween: number;
}

interface State {
  circles: Animated.Value[];
}

export class Bubbles extends Component<Props, State> {
  public static defaultProps: Props = {
    size: 11,
    color: '#000',
    spaceBetween: 6,
  };

  public readonly state = {
    circles: [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
    ],
  };

  private unmounted: boolean = false;
  private timers: NodeJS.Timeout[] = [];

  public componentDidMount() {
    this.state.circles.forEach((_val, index) => {
      const timer = setTimeout(() => this.animate(index), index * 300);
      this.timers.push(timer as any);
    });
  }

  public componentWillUnmount() {
    this.timers.forEach(timer => {
      clearTimeout(timer);
    });

    this.unmounted = true;
  }

  animate(index: number) {
    Animated.sequence([
      Animated.timing(this.state.circles[index], {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.circles[index], {
        toValue: 0,
        duration: 600,
        useNativeDriver: false,
      }),
    ]).start(() => {
      if (!this.unmounted) {
        this.animate(index);
      }
    });
  }

  renderBubble(index: number) {
    const { size, spaceBetween, color } = this.props;
    const scale = this.state.circles[index];
    const offset = {
      cx: size + index * (size * 2 + spaceBetween),
      cy: size,
    };

    return <Circle fill={color} radius={size} scale={scale} {...offset} />;
  }

  render() {
    const { size, spaceBetween } = this.props;
    const width = size * 6 + spaceBetween * 2;
    const height = size * 2;

    return (
      <Svg width={width} height={height}>
        {this.renderBubble(0)}
        {this.renderBubble(1)}
        {this.renderBubble(2)}
      </Svg>
    );
  }
}

export default Bubbles;
