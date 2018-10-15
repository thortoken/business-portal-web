import React from 'react';

import { Steps, Icon } from 'antd';

import PropTypes from 'prop-types';
import Terms from './Terms';

import './OnBoarding.css';

const Step = Steps.Step;

export class OnBoarding extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        invitationId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };
  constructor(props, state) {
    super(props, state);
    this.state = {
      step: 0,
    };
    if (localStorage.getItem('thor-terms-agreement')) {
      this.state = { ...this.state, step: 1 };
    }
  }
  acceptTerms = () => {
    this.setState({ step: 1 });
  };
  render() {
    const { step } = this.state;
    const { match } = this.props;
    const steps = [
      {
        title: 'Terms',
        icon: 'solution',
        content: () => <Terms handleSignUp={this.acceptTerms} id={match.params.invitationId} />,
      },
      {
        title: 'Sign Up',
        icon: 'user',
        content: () => <Terms handleSignUp={this.acceptTerms} id={match.params.invitationId} />,
      },
      {
        title: 'Funding Source',
        icon: 'dollar',
        content: () => <Terms handleSignUp={this.acceptTerms} id={match.params.invitationId} />,
      },
      {
        title: 'Done',
        icon: 'smile-o',
        content: () => <Terms handleSignUp={this.acceptTerms} id={match.params.invitationId} />,
      },
    ];
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
