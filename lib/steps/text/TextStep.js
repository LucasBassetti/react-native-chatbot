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
    if (step.message instanceof Promise) {
      step.message.then((message) => {
        if (!message) {
          this.setState({ loading: false });
          this.props.triggerNextStep();
        } else {
          step.message = message;
          if (this.isComponentMounted) {
            this.setState({ loading: false });
            if (!isComponentWatingUser) {
              this.props.triggerNextStep();
            }
          }
        }
      })
        .catch((error) => {
          step.message = error.message;
          step.error = true;
          step.trigger = step.failTrigger;
          this.setState({ loading: false });
          this.props.triggerNextStep();
        });
    } else if (delay <= 0) {
      if (!isComponentWatingUser) {
        this.props.triggerNextStep();
      }
    } else {
      timer.setTimeout(this, 'componentDidMount', () => {
        if (this.isComponentMounted) {
          this.setState({ loading: false });
          if (!isComponentWatingUser) {
            this.props.triggerNextStep();
          }
        }
      }, delay);
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

    message = (typeof message === 'string' && message.replace(/{previousValue}/g, previousValue)) || null;

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

    if (!(typeof step.message === 'string') && !step.component) {
      return (null);
    }

    const {
      avatar,
      bubbleColor,
      fontColor,
      user,
      showAvatar,
    } = step;
    const showAv = (typeof showAvatar !== 'undefined') ? showAvatar : user ? !hideUserAvatar : !hideBotAvatar;
    const { width, height, ...lessAvatarStyle } = avatarStyle;
    return (
      <TextStepContainer
        className="rsc-ts"
        user={user}
      >
        {
          isFirst && showAv &&
          <ImageContainer
            className="rsc-ts-image-container"
            borderColor={bubbleColor}
            user={user}
            style={lessAvatarStyle}
          >
            <Img
              className="rsc-ts-image"
              source={{ uri: avatar }}
              alt="avatar"
              width={width}
              height={height}
            />
          </ImageContainer>
        }
        <Bubble
          className="rsc-ts-bubble"
          style={bubbleStyle}
          user={user}
          bubbleColor={bubbleColor}
          showAvatar={showAv}
          isFirst={isFirst}
          isLast={isLast}
        >
          { this.state.loading && <Loading color={fontColor} /> }
          {
            !this.state.loading &&
            <TextMessage
              className="rsc-ts-text"
              fontColor={step.error ? '#f00' : fontColor}
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
