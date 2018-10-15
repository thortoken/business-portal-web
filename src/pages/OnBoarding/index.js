import React from 'react';

import { Steps, Icon } from 'antd';

import { Terms } from './Terms';

import './OnBoarding.css';

const Step = Steps.Step;

export class OnBoarding extends React.Component {
  state = {
    step: 0,
  };
  constructor(props, state) {
    super(props, state);
    if (localStorage.getItem('thor-terms-agreement')) {
      this.state = { ...state, step: 1 };
    }
  }
  acceptTerms = () => {
    this.setState({ step: 1 });
  };
  render() {
    const steps = [
      {
        title: 'Terms',
        icon: 'solution',
        content: () => <Terms handleSignUp={this.acceptTerms} />,
      },
      {
        title: 'Sign Up',
        icon: 'user',
        content: () => <Terms handleSignUp={this.acceptTerms} />,
      },
      {
        title: 'Funding Source',
        icon: 'dollar',
        content: () => <Terms handleSignUp={this.acceptTerms} />,
      },
      {
        title: 'Done',
        icon: 'smile-o',
        content: () => <Terms handleSignUp={this.acceptTerms} />,
      },
    ];
    const { step } = this.state;
    return (
      <div className="OnBoarding">
        <div className="OnBoarding__container">
          <div className="OnBoarding__steps">
            <Steps current={step}>
              {steps.map(item => (
                <Step
                  key={item.title}
                  title={item.title}
                  icon={<Icon type={item.icon} theme="outlined" />}
                />
              ))}
            </Steps>
          </div>
          <div className="OnBoarding__steps--content">{steps[step].content()}</div>
        </div>
      </div>
    );
  }
}
export default OnBoarding;
