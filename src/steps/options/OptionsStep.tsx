import React, { Component } from 'react';
import Option from './Option';
import OptionElement from './OptionElement';
import OptionText from './OptionText';
import Options from './Options';

interface Props {
  step: {};
  triggerNextStep: Function;
  optionStyle: {};
  optionElementStyle: {};
}

export class OptionsStep extends Component<Props> {
  private onOptionClick = ({ value }) => {
    this.props.triggerNextStep({ value });
  };

  private renderOption = option => {
    const { optionStyle, optionElementStyle } = this.props;
    const { optionBubbleColor, optionFontColor, bubbleColor, fontColor } = this
      .props.step as any;
    const { value, label } = option;
    return (
      <Option
        key={value}
        style={optionStyle}
        onPress={() => this.onOptionClick({ value })}
      >
        <OptionElement
          style={optionElementStyle}
          bubbleColor={optionBubbleColor || bubbleColor}
        >
          <OptionText fontColor={optionFontColor || fontColor}>
            {label}
          </OptionText>
        </OptionElement>
      </Option>
    );
  };

  render() {
    const { options } = this.props.step as any;

    return <Options>{options.map(this.renderOption)}</Options>;
  }
}

export default OptionsStep;
