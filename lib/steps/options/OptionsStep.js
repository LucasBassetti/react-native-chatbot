import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Option from './Option';
import OptionElement from './OptionElement';
import OptionText from './OptionText';
import Options from './Options';

class OptionsStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.renderOption = this.renderOption.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
  }

  onOptionClick({ value }) {
    this.props.triggerNextStep({ value });
  }

  renderOption(option) {
    const { optionStyle, optionElementStyle } = this.props;
    const { optionBubbleColor, optionFontColor, bubbleColor, fontColor } = this.props.step;
    const { value, label } = option;
    return (
      <Option
        key={value}
        className="rsc-os-option"
        style={optionStyle}
        onPress={() => this.onOptionClick({ value })}
      >
        <OptionElement
          className="rsc-os-option-element"
          style={optionElementStyle}
          bubbleColor={optionBubbleColor || bubbleColor}
        >
          <OptionText
            class="rsc-os-option-text"
            fontColor={optionFontColor || fontColor}
          >
            {label}
          </OptionText>
        </OptionElement>
      </Option>
    );
  }

  render() {
    const { options } = this.props.step;

    return (
      <Options className="rsc-os">
        {_.map(options, this.renderOption)}
      </Options>
    );
  }
}

OptionsStep.propTypes = {
  step: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  optionStyle: PropTypes.object.isRequired,
  optionElementStyle: PropTypes.object.isRequired,
};

export default OptionsStep;
