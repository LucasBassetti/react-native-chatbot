import React, { Component } from 'react';
import Bubble from './Bubble';
import Img from './Image';
import ImageContainer from './ImageContainer';
import Loading from '../common/Loading';
import TextStepContainer from './TextStepContainer';
import TextMessage from './TextMessage';

interface Props {
  isFirst: boolean;
  isLast: boolean;
  step: {};
  triggerNextStep: Function;
  avatarStyle: {};
  avatarWrapperStyle?: {};
  bubbleStyle: {};
  userBubbleStyle: {};
  hideBotAvatar: boolean;
  hideUserAvatar: boolean;
  previousStep?: {};
  previousValue?: any;
  steps?: {};
}

interface State {
  loading: boolean;
}

export class TextStep extends Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    previousStep: {},
    steps: {},
    previousValue: '',
    avatarWrapperStyle: {},
  };

  public readonly state = {
    loading: true,
  };

  public componentDidMount() {
    const { step } = this.props;
    const { component, delay, waitAction } = step as any;
    const isComponentWatingUser = component && waitAction;
    setTimeout(() => {
      // this.props.triggerNextStep();
      this.setState({ loading: false });
      if (!isComponentWatingUser) {
        this.props.triggerNextStep();
      }
    }, delay);
  }

  private renderMessage = () => {
    const { previousValue, step } = this.props;
    const { component } = step as any;
    let { message } = step as any;

    if (component) {
      const { steps, previousStep, triggerNextStep } = this.props;
      return React.cloneElement(component, {
        step,
        steps,
        previousStep,
        triggerNextStep,
      });
    }

    message = message.replace(/{previousValue}/g, previousValue);

    return message;
  };

  public render() {
    const {
      step,
      isFirst,
      isLast,
      avatarStyle,
      avatarWrapperStyle,
      bubbleStyle,
      userBubbleStyle,
      hideBotAvatar,
      hideUserAvatar,
    } = this.props;
    const { avatar, bubbleColor, fontColor, user } = step as any;

    const showAvatar = user ? !hideUserAvatar : !hideBotAvatar;

    return (
      <TextStepContainer user={user}>
        {isFirst && showAvatar && (
          <ImageContainer
            borderColor={bubbleColor}
            style={avatarWrapperStyle}
            user={user}
          >
            <Img
              style={avatarStyle}
              // showAvatar={showAvatar}
              // user={user}
              source={{ uri: avatar }}
              // alt="avatar"
            />
          </ImageContainer>
        )}
        <Bubble
          style={user ? userBubbleStyle || bubbleStyle : bubbleStyle}
          user={user}
          bubbleColor={bubbleColor}
          showAvatar={showAvatar}
          isFirst={isFirst}
          isLast={isLast}
        >
          {this.state.loading && <Loading color={fontColor} />}
          {!this.state.loading && (
            <TextMessage fontColor={fontColor}>
              {this.renderMessage()}
            </TextMessage>
          )}
        </Bubble>
      </TextStepContainer>
    );
  }
}

export default TextStep;
