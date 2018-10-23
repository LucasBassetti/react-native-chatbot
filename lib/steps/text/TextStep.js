import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bubble from './Bubble';
import Img from './Image';
import ImageContainer from './ImageContainer';
import Loading from '../common/Loading';
import TextStepContainer from './TextStepContainer';
import TextMessage from './TextMessage';

const timer = require('react-native-timer');

class TextStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
    this.isComponentMounted = false;
    this.renderMessage = this.renderMessage.bind(this);
  }

  componentDidMount() {
    const { step } = this.props;
    const { component, delay, waitAction } = step;
    const isComponentWatingUser = component && waitAction;
    this.isComponentMounted = true;
    if(step.message instanceof Promise){
      step.message.then((message) => {
        step.message = message;
        if(this.isComponentMounted) {
          this.setState({ loading: false });
          if (!isComponentWatingUser) {
            this.props.triggerNextStep();
          }
        }
      })
    } else {
      if(delay <= 0){
        this.setState({ loading: false });
        if (!isComponentWatingUser) {
          this.props.triggerNextStep();
        }
      } else {
        timer.setTimeout(this, 'componentDidMount', () => {
          if(this.isComponentMounted) {
            this.setState({ loading: false });
            if (!isComponentWatingUser) {
              this.props.triggerNextStep();
            }
          }
        }, delay);
      }
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
    timer.clearTimeout(this);
  }

  renderMessage() {
    const { previousValue, step } = this.props;
    const { component } = step;
    let { message } = step;

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
  }

  render() {
    const {
      step,
      isFirst,
      isLast,
      avatarStyle,
      bubbleStyle,
      hideBotAvatar,
      hideUserAvatar,
    } = this.props;
    const {
      avatar,
      bubbleColor,
      fontColor,
      user,
    } = step;

    const showAvatar = user ? !hideUserAvatar : !hideBotAvatar;

    return (
      <TextStepContainer
        className="rsc-ts"
        user={user}
      >
        {
          isFirst && showAvatar &&
          <ImageContainer
            className="rsc-ts-image-container"
            borderColor={bubbleColor}
            user={user}
          >
            <Img
              className="rsc-ts-image"
              style={avatarStyle}
              showAvatar={showAvatar}
              user={user}
              source={{ uri: avatar }}
              alt="avatar"
            />
          </ImageContainer>
        }
        <Bubble
          className="rsc-ts-bubble"
          style={bubbleStyle}
          user={user}
          bubbleColor={bubbleColor}
          showAvatar={showAvatar}
          isFirst={isFirst}
          isLast={isLast}
        >
          { this.state.loading && <Loading color={fontColor} /> }
          {
            !this.state.loading &&
            <TextMessage
              className="rsc-ts-text"
              fontColor={fontColor}
            >
              {this.renderMessage()}
            </TextMessage>
          }
        </Bubble>
      </TextStepContainer>
    );
  }
}

TextStep.propTypes = {
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  step: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  avatarStyle: PropTypes.object.isRequired,
  bubbleStyle: PropTypes.object.isRequired,
  hideBotAvatar: PropTypes.bool.isRequired,
  hideUserAvatar: PropTypes.bool.isRequired,
  previousStep: PropTypes.object,
  previousValue: PropTypes.any,
  steps: PropTypes.object,
};

TextStep.defaultProps = {
  previousStep: {},
  steps: {},
  previousValue: '',
};

export default TextStep;
