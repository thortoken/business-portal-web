import React from 'react';
import { Button } from 'antd';

import Header from '~components/Header';

import Steps from './components/Steps';

import './Welcome.css';

export default class Welcome extends React.Component {
  state = {
    currentStep: 0,
  };

  render() {
    const { currentStep } = this.state;

    return (
      <div className="Welcome">
        <Header title="Welcome to the Thor Business Dashboard!">
          <Header.Right>
            <Button size="large" ghost>
              Manage Accounts
            </Button>
          </Header.Right>
        </Header>
        <Steps currentStep={currentStep} className="Welcome-steps" />
        {Steps.steps[currentStep].content}
      </div>
    );
  }
}