import React from 'react';

import { Switch } from 'antd';

import './Balance.css';
import { formatThor } from '~utils/number';

export const Balance = props => {
  return (
    <div className="Balance">
      <div className="Balance-value">
        <div className="Balance-value-currency">
          Balance:{' '}
          <img src="images/Thor_Logo-small.png" alt="Thor Logo grey" className="Balance-image" />
        </div>
        <span>{formatThor(props.balanceValue)}</span>
      </div>
      <div className="Balance-approximately-box">
        <div className="Balance-approximately-message">
          Approx. {props.paymentDaysLeft} days of payments
        </div>
        <div className="Balance-approximately-switch">
          <span className="Balance-approximately-switch-label">
            Auto Renew {props.isAutoRenewOn ? 'ON' : 'OFF'}
          </span>
          <Switch defaultChecked onChange={props.onChange} />
        </div>
      </div>
    </div>
  );
};

export default Balance;
