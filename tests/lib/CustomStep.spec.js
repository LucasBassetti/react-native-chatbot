import React from 'react';
import { Text } from 'react-native';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { CustomStep } from '../../lib/steps/steps';
import CustomStepContainer from '../../lib/steps/custom/CustomStepContainer';

const Example = () => (
  <Text className="example">
    Example
  </Text>
);

describe('CustomStep', () => {
  describe('Without wait user', () => {
    const steps = {
      step1: {
        id: '1',
        component: <Example />,
      },
    };
    const step = steps.step1;
    const settings = {
      step,
      steps,
      delay: 0,
      style: { border: 0 },
      previousStep: step,
      triggerNextStep: () => {},
    };

    const wrapper = shallow(<CustomStep {...settings} />);

    it('should render', () => {
      expect(wrapper.hasClass('rsc-cs')).to.be.equal(true);
      expect(wrapper.find(CustomStepContainer)).to.have.length(1);
    });

    it('should render without boder', () => {
      expect(wrapper.find(CustomStepContainer).props().style.border).to.be.equal(0);
    });
  });

  describe('With wait user', () => {
    const steps = {
      step1: {
        id: '1',
        component: <Example />,
        waitAction: true,
      },
    };
    const step = steps.step1;
    const settings = {
      step,
      steps,
      delay: 0,
      previousStep: step,
      style: {},
      triggerNextStep: () => {},
    };

    const wrapper = shallow(<CustomStep {...settings} />);

    it('should render', () => {
      expect(wrapper.hasClass('rsc-cs')).to.be.equal(true);
      expect(wrapper.find(CustomStepContainer)).to.have.length(1);
    });
  });
});
