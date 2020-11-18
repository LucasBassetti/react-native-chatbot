import React, { cloneElement, Component } from 'react';
import Loading from '../common/Loading';
import CustomStepContainer from './CustomStepContainer';

interface Props {
  delay: number;
  step: {};
  steps: {};
  style: {};
  previousStep: {};
  triggerNextStep: Function;
}

interface State {
  loading: boolean;
}

export class CustomStep extends Component<Props, State> {
  public readonly state = {
    loading: true,
  };

  private renderComponent = () => {
    const { step, steps, previousStep, triggerNextStep } = this.props;
    const { component } = step as any;
    return cloneElement(component, {
      step,
      steps,
      previousStep,
      triggerNextStep,
    });
  };

  public componentDidMount() {
    const { delay } = this.props;
    const { waitAction } = this.props.step as any;
    setTimeout(() => {
      this.setState({ loading: false });
      if (!waitAction) {
        this.props.triggerNextStep();
      }
    }, delay);
  }

  public render() {
    const { loading } = this.state;
    const { style, step } = this.props;

    return (
      <CustomStepContainer style={style}>
        {loading ? (
          <Loading color={(step as any).loadingColor} custom />
        ) : (
          this.renderComponent()
        )}
      </CustomStepContainer>
    );
  }
}

export default CustomStep;
