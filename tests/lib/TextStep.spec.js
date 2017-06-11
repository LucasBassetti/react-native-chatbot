import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { TextStep } from '../../lib/steps/steps';
import Image from '../../lib/steps/text/Image';

describe('TextStep', () => {
  describe('Bot text', () => {
    const settings = {
      step: {
        id: '1',
        audio: false,
        message: 'Hello',
        delay: 0,
        bubbleColor: '#eee',
        fontColor: '#000',
        avatar: '',
      },
      isFirst: true,
      isLast: true,
      hideBotAvatar: false,
      hideUserAvatar: false,
      avatarStyle: {},
      bubbleStyle: {},
      triggerNextStep: () => {},
    };

    const wrapper = shallow(<TextStep {...settings} />);
    const step = wrapper.unrendered.props.step;

    it('should render', () => {
      expect(wrapper.hasClass('rsc-ts')).to.be.equal(true);
    });

    it('should render bubble with background color equal \'#eee\'', () => {
      expect(step.bubbleColor).to.be.equal('#eee');
    });

    it('should render bubble with font color equal \'#000\'', () => {
      expect(step.fontColor).to.be.equal('#000');
    });

    it('should render image', () => {
      expect(wrapper.find(Image).exists()).to.be.equal(true);
    });

    it('should render a first bubble (but not last)', () => {
      const tsWrapper = shallow(
        <TextStep {...settings} isFirst={true} isLast={false} />,
      );
      expect(tsWrapper.find(Image).exists()).to.be.equal(true);
    });

    it('should render a without avatar', () => {
      const tsWrapper = shallow(
        <TextStep {...settings} isFirst={false} hideBotAvatar={true} />,
      );
      expect(tsWrapper.find(Image).exists()).to.be.equal(false);
    });

    it('should render a middle bubble', () => {
      const tsWrapper = shallow(
        <TextStep {...settings} isFirst={false} isLast={false} />,
      );
      expect(tsWrapper.find(Image).exists()).to.be.equal(false);
    });
  });

  describe('User text', () => {
    const settings = {
      step: {
        id: '1',
        message: 'Hello',
        delay: 0,
        user: true,
        bubbleColor: '#eee',
        fontColor: '#000',
        avatar: '',
      },
      isFirst: false,
      isLast: true,
      hideBotAvatar: false,
      hideUserAvatar: false,
      avatarStyle: {},
      bubbleStyle: {},
      triggerNextStep: () => {},
    };

    const wrapper = shallow(<TextStep {...settings} />);

    it('should render bubble without avatar (not first)', () => {
      expect(wrapper.find(Image).exists()).to.be.equal(false);
    });

    it('should render a first bubble', () => {
      const tsWrapper = shallow(
        <TextStep {...settings} isFirst={true} isLast={false} />,
      );
      expect(tsWrapper.find(Image).exists()).to.be.equal(true);
    });

    it('should render a without avatar', () => {
      const tsWrapper = shallow(
        <TextStep {...settings} showUserAvatar={false} />,
      );
      expect(tsWrapper.find(Image).exists()).to.be.equal(false);
    });

    it('should render a middle bubble', () => {
      const tsWrapper = shallow(
        <TextStep {...settings} isFirst={false} isLast={false} />,
      );
      expect(tsWrapper.find(Image)).to.exist;
    });
  });
});
