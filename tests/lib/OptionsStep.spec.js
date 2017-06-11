import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { OptionsStep } from '../../lib/steps/steps';

describe('OptionsStep', () => {
  const settings = {
    step: {
      id: '1',
      options: [
        { value: 'op1', label: 'Option 1', target: '2' },
        { value: 'op2', label: 'Option 2', target: '3' },
      ],
      bubbleColor: '#eee',
      fontColor: '#000',
    },
    bubbleStyle: {},
    triggerNextStep: () => {},
  };

  const wrapper = shallow(<OptionsStep {...settings} />);
  const step = wrapper.unrendered.props.step;

  it('should render', () => {
    expect(wrapper.hasClass('rsc-os')).to.be.equal(true);
  });

  it('should render 2 options', () => {
    expect(wrapper.find('.rsc-os-option').length).to.be.equal(2);
  });

  it('should render option bubble with background color equal \'#eee\'', () => {
    expect(step.bubbleColor).to.be.equal('#eee');
  });

  it('should render option bubble with font color equal \'#000\'', () => {
    expect(step.fontColor).to.be.equal('#000');
  });
});
