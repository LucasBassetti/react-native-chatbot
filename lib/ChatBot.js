import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Random from 'random-id';
import { Dimensions, Keyboard, TextInput, ScrollView, Platform } from 'react-native';
import { CustomStep, OptionsStep, TextStep } from './steps/steps';
import schema from './schemas/schema';
import ChatBotContainer from './ChatBotContainer';
import InputView from './InputView';
import Footer from './Footer';
import Button from './Button';
import ButtonText from './ButtonText';

const { height, width } = Dimensions.get('window');

class ChatBot extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.state = {
      renderedSteps: [],
      previousSteps: [],
      currentStep: {},
      previousStep: {},
      steps: {},
      editable: false,
      inputValue: '',
      inputInvalid: false,
      defaultUserSettings: {},
    };

    this.getStepMessage = this.getStepMessage.bind(this);
    this.getTriggeredStep = this.getTriggeredStep.bind(this);
    this.generateRenderedStepsById = this.generateRenderedStepsById.bind(this);
    this.renderStep = this.renderStep.bind(this);
    this.triggerNextStep = this.triggerNextStep.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.setContentRef = this.setContentRef.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
    this.setScrollViewScrollToEnd = this.setScrollViewScrollToEnd.bind(this);

    // instead of using a timeout on input focus/blur we can listen for the native keyboard events
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.setScrollViewScrollToEnd);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.setScrollViewScrollToEnd);
  }

  componentWillMount() {
    const {
      botDelay,
      botAvatar,
      botBubbleColor,
      botFontColor,
      customDelay,
      customLoadingColor,
      userDelay,
      userAvatar,
      userBubbleColor,
      userFontColor,
      optionBubbleColor,
      optionFontColor
    } = this.props;
    const steps = {};

    const defaultBotSettings = {
      delay: botDelay,
      avatar: botAvatar,
      bubbleColor: botBubbleColor,
      fontColor: botFontColor,
      optionBubbleColor: optionBubbleColor,
      optionFontColor: optionFontColor
    };
    const defaultUserSettings = {
      delay: userDelay,
      avatar: userAvatar,
      bubbleColor: userBubbleColor,
      fontColor: userFontColor,
    };
    const defaultCustomSettings = {
      delay: customDelay,
      loadingColor: customLoadingColor,
    };

    for (let i = 0, len = this.props.steps.length; i < len; i += 1) {
      const step = this.props.steps[i];
      let settings = {};

      if (step.user) {
        settings = defaultUserSettings;
      } else if (step.message || step.asMessage || step.options) {
        settings = defaultBotSettings;
      } else if (step.component) {
        settings = defaultCustomSettings;
      }

      steps[step.id] = Object.assign(
        {},
        settings,
        schema.parse(step),
      );
    }

    schema.checkInvalidIds(steps);

    const firstStep = this.props.steps[0];

    if (firstStep.message) {
      const { message } = firstStep;
      firstStep.message = typeof message === 'function' ? message() : message;
      steps[firstStep.id].message = firstStep.message;
    }

    const currentStep = firstStep;
    const renderedSteps = [steps[currentStep.id]];
    const previousSteps = [steps[currentStep.id]];

    this.setState({
      defaultUserSettings,
      steps,
      currentStep,
      renderedSteps,
      previousSteps,
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onButtonPress() {
    const {
      renderedSteps,
      previousSteps,
      inputValue,
      defaultUserSettings,
    } = this.state;
    let { currentStep } = this.state;

    const isInvalid = currentStep.validator && this.checkInvalidInput();

    if (!isInvalid) {
      const step = {
        message: inputValue,
        value: inputValue,
      };

      currentStep = Object.assign(
        {},
        defaultUserSettings,
        currentStep,
        step,
      );

      renderedSteps.push(currentStep);
      previousSteps.push(currentStep);

      this.setState({
        currentStep,
        renderedSteps,
        previousSteps,
        editable: false,
        inputValue: '',
      });
    }
  }

  getStepMessage(message) {
    const { previousSteps } = this.state;
    const lastStepIndex = previousSteps.length > 0 ? previousSteps.length - 1 : 0;
    const steps = this.generateRenderedStepsById();
    const previousValue = previousSteps[lastStepIndex].value;
    return (typeof message === 'function') ? message({ previousValue, steps }) : message;
  }

  getTriggeredStep(trigger, value) {
    const steps = this.generateRenderedStepsById();
    return (typeof trigger === 'function') ? trigger({ value, steps }) : trigger;
  }

  setContentRef(c) {
    this.scrollView = c;
  }

  setInputRef(c) {
    this.inputRef = c;
  }

  setScrollViewScrollToEnd() {
    this.scrollView.scrollToEnd();
  }

  handleEnd() {
    const { previousSteps } = this.state;

    const renderedSteps = previousSteps.map((step) => {
      const { id, message, value, metadata } = step;
      return { id, message, value, metadata };
    });

    const steps = [];

    for (let i = 0, len = previousSteps.length; i < len; i += 1) {
      const { id, message, value, metadata } = previousSteps[i];
      steps[id] = { id, message, value, metadata };
    }

    const values = previousSteps.filter(step => step.value).map(step => step.value);

    if (this.props.handleEnd) {
      this.props.handleEnd({ renderedSteps, steps, values });
    }
  }

  triggerNextStep(data) {
    const {
      renderedSteps,
      previousSteps,
      steps,
      defaultUserSettings,
    } = this.state;
    let { currentStep, previousStep } = this.state;
    const isEnd = currentStep.end;

    if (data && data.value) {
      currentStep.value = data.value;
    }
    if (data && data.trigger) {
      currentStep.trigger = this.getTriggeredStep(data.trigger, data.value);
    }

    if (isEnd) {
      this.handleEnd();
    } else if (currentStep.options && data) {
      const option = currentStep.options.filter(o => o.value === data.value)[0];
      const trigger = this.getTriggeredStep(option.trigger, currentStep.value);
      delete currentStep.options;

      currentStep = Object.assign(
        {},
        currentStep,
        option,
        defaultUserSettings,
        {
          user: true,
          message: option.label,
          trigger,
        },
      );

      renderedSteps.pop();
      previousSteps.pop();
      renderedSteps.push(currentStep);
      previousSteps.push(currentStep);

      this.setState({
        currentStep,
        renderedSteps,
        previousSteps,
      });
    } else if (currentStep.trigger) {
      const isReplace = currentStep.replace && !currentStep.option;

      if (isReplace) {
        renderedSteps.pop();
      }

      const trigger = this.getTriggeredStep(currentStep.trigger, currentStep.value);
      let nextStep = Object.assign({}, steps[trigger]);

      if (nextStep.message) {
        nextStep.message = this.getStepMessage(nextStep.message);
      } else if (nextStep.update) {
        const updateStep = nextStep;
        nextStep = Object.assign({}, steps[updateStep.update]);

        if (nextStep.options) {
          for (let i = 0, len = nextStep.options.length; i < len; i += 1) {
            nextStep.options[i].trigger = updateStep.trigger;
          }
        } else {
          nextStep.trigger = updateStep.trigger;
        }
      }

      nextStep.key = Random(24);

      previousStep = currentStep;
      currentStep = nextStep;

      if (nextStep.user) {
        this.setState({ editable: true });
        this.inputRef.focus();
      } else {
        renderedSteps.push(nextStep);
        previousSteps.push(nextStep);
      }

      this.setState({
        renderedSteps,
        previousSteps,
        currentStep,
        previousStep,
      });

      Keyboard.dismiss();
    }
  }

  generateRenderedStepsById() {
    const { previousSteps } = this.state;
    const steps = {};

    for (let i = 0, len = previousSteps.length; i < len; i += 1) {
      const { id, message, value, metadata } = previousSteps[i];
      steps[id] = { id, message, value, metadata };
    }

    return steps;
  }

  isLastPosition(step) {
    const { renderedSteps } = this.state;
    const { length } = renderedSteps;
    const stepIndex = renderedSteps.map(s => s.key).indexOf(step.key);

    if (length <= 1 || (stepIndex + 1) === length) {
      return true;
    }

    const nextStep = renderedSteps[stepIndex + 1];
    const hasMessage = nextStep.message || nextStep.asMessage;

    if (!hasMessage) {
      return true;
    }

    const isLast = step.user !== nextStep.user;
    return isLast;
  }

  isFirstPosition(step) {
    const { renderedSteps } = this.state;
    const stepIndex = renderedSteps.map(s => s.key).indexOf(step.key);

    if (stepIndex === 0) {
      return true;
    }

    const lastStep = renderedSteps[stepIndex - 1];
    const hasMessage = lastStep.message || lastStep.asMessage;

    if (!hasMessage) {
      return true;
    }

    const isFirst = step.user !== lastStep.user;
    return isFirst;
  }

  handleKeyPress(event) {
    if (event.nativeEvent.key === 'Enter') {
      this.onButtonPress();
    }
  }

  checkInvalidInput() {
    const { currentStep, inputValue } = this.state;
    const result = currentStep.validator(inputValue);
    const value = inputValue;

    if (typeof result !== 'boolean' || !result) {
      this.setState({
        inputValue: result.toString(),
        inputInvalid: true,
        editable: false,
      });

      setTimeout(() => {
        this.setState({
          inputValue: value,
          inputInvalid: false,
          editable: true,
        });
        this.inputRef.focus();
      }, 2000);

      return true;
    }

    return false;
  }

  renderStep(step, index) {
    const { renderedSteps, previousSteps } = this.state;
    const {
      avatarStyle,
      avatarWrapperStyle,
      bubbleStyle,
      userBubbleStyle,
      optionStyle,
      optionElementStyle,
      customStyle,
      customDelay,
      hideBotAvatar,
      hideUserAvatar,
    } = this.props;
    const { options, component, asMessage } = step;
    const steps = {};
    const stepIndex = renderedSteps.map(s => s.id).indexOf(step.id);
    const previousStep = stepIndex > 0 ? renderedSteps[index - 1] : {};

    for (let i = 0, len = previousSteps.length; i < len; i += 1) {
      const ps = previousSteps[i];

      steps[ps.id] = {
        id: ps.id,
        message: ps.message,
        value: ps.value,
      };
    }

    if (component && !asMessage) {
      return (
        <CustomStep
          key={index}
          delay={customDelay}
          step={step}
          steps={steps}
          style={customStyle}
          previousStep={previousStep}
          triggerNextStep={this.triggerNextStep}
        />
      );
    }

    if (options) {
      return (
        <OptionsStep
          key={index}
          step={step}
          triggerNextStep={this.triggerNextStep}
          optionStyle={optionStyle || bubbleStyle}
          optionElementStyle={optionElementStyle|| bubbleStyle}
        />
      );
    }

    return (
      <TextStep
        key={index}
        step={step}
        steps={steps}
        previousValue={previousStep.value}
        triggerNextStep={this.triggerNextStep}
        avatarStyle={avatarStyle}
        avatarWrapperStyle={avatarWrapperStyle}
        bubbleStyle={bubbleStyle}
        userBubbleStyle={userBubbleStyle}
        hideBotAvatar={hideBotAvatar}
        hideUserAvatar={hideUserAvatar}
        isFirst={this.isFirstPosition(step)}
        isLast={this.isLastPosition(step)}
      />
    );
  }

  render() {
    const {
      currentStep,
      editable,
      inputInvalid,
      inputValue,
      renderedSteps,
    } = this.state;
    const {
      botBubbleColor,
      botFontColor,
      className,
      contentStyle,
      footerStyle,
      headerComponent,
      inputAttributes,
      inputStyle,
      keyboardVerticalOffset,
      placeholder,
      style,
      submitButtonStyle,
      submitButtonContent,
      scrollViewProps,
    } = this.props;

    const styles = {
      input: {
        borderWidth: 0,
        color: inputInvalid ? '#E53935' : '#4a4a4a',
        fontSize: 14,
        opacity: !editable && !inputInvalid ? 0.5 : 1,
        paddingRight: 16,
        paddingLeft: 16,
        height: 50,
        width: width - 80,
      },
      content: {
        height: height - 50,
        backgroundColor: '#eee',
      },
    };

    const textInputStyle = Object.assign({}, styles.input, inputStyle);
    const scrollViewStyle = Object.assign({}, styles.content, contentStyle);
    const platformBehavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const inputAttributesOverride = currentStep.inputAttributes || inputAttributes;

    return (
      <ChatBotContainer
        className={`rsc ${className}`}
        style={style}
      >
        {!!headerComponent && headerComponent}
        <ScrollView
          className="rsc-content"
          style={scrollViewStyle}
          ref={this.setContentRef}
          onContentSizeChange={this.setScrollViewScrollToEnd}
          {...scrollViewProps}
        >
          {_.map(renderedSteps, this.renderStep)}
        </ScrollView>
        <InputView
          behavior={platformBehavior}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <Footer
            className="rsc-footer"
            style={footerStyle}
            disabled={!editable}
            invalid={inputInvalid}
            color={botBubbleColor}
          >
            <TextInput
              type="textarea"
              style={textInputStyle}
              className="rsc-input"
              placeholder={placeholder}
              ref={this.setInputRef}
              onKeyPress={this.handleKeyPress}
              onChangeText={text => this.setState({ inputValue: text })}
              value={inputValue}
              underlineColorAndroid="transparent"
              invalid={inputInvalid}
              editable={editable}
              {...inputAttributesOverride}
            />
            <Button
              className="rsc-button"
              style={submitButtonStyle}
              disabled={!editable}
              onPress={this.onButtonPress}
              invalid={inputInvalid}
              backgroundColor={botBubbleColor}
            >
              <ButtonText
                className="rsc-button-text"
                invalid={inputInvalid}
                fontColor={botFontColor}
              >
                {submitButtonContent}
              </ButtonText>
            </Button>
          </Footer>
        </InputView>
      </ChatBotContainer>
    );
  }
}

ChatBot.propTypes = {
  avatarStyle: PropTypes.object,
  avatarWrapperStyle: PropTypes.object,
  botAvatar: PropTypes.string,
  botBubbleColor: PropTypes.string,
  botDelay: PropTypes.number,
  botFontColor: PropTypes.string,
  bubbleStyle: PropTypes.object,
  optionStyle: PropTypes.object,
  optionBubbleColor: PropTypes.string,
  optionFontColor: PropTypes.string,
  optionElementStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  customStyle: PropTypes.object,
  customDelay: PropTypes.number,
  customLoadingColor: PropTypes.string,
  className: PropTypes.string,
  handleEnd: PropTypes.func,
  headerComponent: PropTypes.element,
  hideBotAvatar: PropTypes.bool,
  hideUserAvatar: PropTypes.bool,
  footerStyle: PropTypes.object,
  inputAttributes: PropTypes.objectOf(PropTypes.any),
  inputStyle: PropTypes.object,
  keyboardVerticalOffset: PropTypes.number,
  placeholder: PropTypes.string,
  steps: PropTypes.array.isRequired,
  style: PropTypes.object,
  submitButtonStyle: PropTypes.object,
  submitButtonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  userAvatar: PropTypes.string,
  userBubbleStyle: PropTypes.object,
  userBubbleColor: PropTypes.string,
  userDelay: PropTypes.number,
  userFontColor: PropTypes.string,
  scrollViewProps: PropTypes.object,
};

ChatBot.defaultProps = {
  avatarStyle: {},
  avatarWrapperStyle: {},
  botBubbleColor: '#6E48AA',
  botDelay: 1000,
  botFontColor: '#fff',
  bubbleStyle: {},
  optionStyle: {},
  optionBubbleColor: '#6E48AA',
  optionFontColor: '#fff',
  optionElementStyle: {},
  contentStyle: {},
  customStyle: {},
  customDelay: 1000,
  customLoadingColor: '#4a4a4a',
  className: '',
  footerStyle: {},
  handleEnd: undefined,
  hideBotAvatar: false,
  hideUserAvatar: false,
  inputAttributes: {},
  inputStyle: {},
  keyboardVerticalOffset: Platform.OS === 'ios' ? 44 : 0,
  placeholder: 'Type the message ...',
  headerComponent: undefined,
  style: {},
  submitButtonStyle: {},
  submitButtonContent: 'SEND',
  userBubbleStyle: {},
  userBubbleColor: '#fff',
  userDelay: 1000,
  userFontColor: '#4a4a4a',
  botAvatar: 'data:image/png;base64,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CgABQAoAkgJAAJACgKQAEACkACAFANLG0++Ef3763T+eQNbFwm0fbZ+z9cPA7zrw/nLu5e0PPP3lQy9+diVZF1c9++XPTWQgg8krr/6dbyt/67XjV3AvbyhY97n/MQAgAASAAAAACAABIAAAAAJAAAgAAIAAEAACAAAgAASAAAAACAABIAAAAAJAAAgAAIAAEAACAAAgAASAAAAACAABIAAAAAJAAAgAAIAAEAACAAAgAASAAAAACAABIAAAQABQAAgAABAAAoACAAAEgAAQAAIAAASAABAAAAABIAAEAABAAAgAAQAAEAACQAAAAASAABAAAAABIAAEAABAAAgAAQAAEAACQAAAAASAABAAAAABIAAEAABAAAgAAQAAEAACQAAAAASAABAAAAABIAAEAAAIAAoAAQAAAkAAGPgCAAAEgACgAAAAASAABAAAQAAIAAEAABAAAkAAAAAEgAAQAAAAASAABAAAQAAIAAEAABAAAkAAAAAEgAAQAAAAASAABAAAQAAIAAEAADhE8strpiYGXhG/a/epGz7gd71p1qbn/Y8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIKP4/9SvqPKKR6/4AAAAASUVORK5CYII=',
  userAvatar: 'data:image/png;base64,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',
  scrollViewProps: {},
};

export default ChatBot;
