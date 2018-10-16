import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../common/Loading';
import CustomStepContainer from './CustomStepContainer';

const timer = require('react-native-timer');

class CustomStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderComponent = this.renderComponent.bind(this);
  }

  componentDidMount() {
    const { delay } = this.props;
    const { waitAction } = this.props.step;
    timer.setTimeout(this,
      'componentDidMount',
      () => {
        this.setState({ loading: false });
        if (!waitAction) {
          this.props.triggerNextStep();
        }
      }, delay);
  }

  componentWillUnmount() {
    timer.clearTimeout(this);
  }

  renderComponent() {
    const { step, steps, previousStep, triggerNextStep } = this.props;
    const { component } = step;
    return React.cloneElement(component, {
      step,
      steps,
      previousStep,
      triggerNextStep,
    });
  }

  render() {
    const { loading } = this.state;
    const { style, step } = this.props;

    return (
      <CustomStepContainer
        className="rsc-cs"
        style={style}
      >
        {
          loading ? (
            <Loading
              color={step.loadingColor}
              custom={true}
            />
          ) : this.renderComponent()
        }
      </CustomStepContainer>
    );
  }
}

CustomStep.propTypes = {
  delay: PropTypes.number.isRequired,
  step: PropTypes.object.isRequired,
  steps: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  previousStep: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
};

export default CustomStep;
