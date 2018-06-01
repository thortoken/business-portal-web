import React from 'react';
import classnames from 'classnames';
import { Steps as AntSteps, Icon } from 'antd';

import AddTeamStep from './AddTeamStep';
import ConnectBankStep from './ConnectBankStep';
import EnablePaymentsStep from './EnablePaymentsStep';

import './Steps.css';

const { Step: AntStep } = AntSteps;

export default class Steps extends React.Component {
  static steps = [
    {
      key: 'addTeam',
      title: 'Add Your Team',
      content: <AddTeamStep />,
      icon: 'user',
    },
    {
      key: 'connectBank',
      title: 'Connect Your Bank',
      content: <ConnectBankStep />,
      icon: 'bank',
    },
    {
      key: 'enablePayments',
      title: 'Enable Payments',
      content: <EnablePaymentsStep />,
      icon: 'pay-circle-o',
    },
  ];

  render() {
    const { className, currentStep } = this.props;
    return (
      <AntSteps current={currentStep} className={classnames('Steps', className)}>
        {Steps.steps.map(step => (
          <AntStep key={step.key} title={step.title} icon={<Icon type={step.icon} />} />
        ))}
      </AntSteps>
    );
  }
}
