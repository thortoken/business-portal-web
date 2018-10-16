import React, { Component } from 'react';
import classnames from 'classnames';

import { Button } from 'antd';

import { formatUsd } from '~utils/number';

import './BottomBar.scss';

export class BottomBar extends Component {
  render() {
    const { onSubmit, selectedContractorsIds, selectedTransactionsSummaryValue } = this.props;
    const selectedContractorsCount = selectedContractorsIds.size;

    return (
      <div className={classnames(null, { 'BottomBar-hidden': selectedContractorsCount === 0 })}>
        <div className="BottomBar-placeholder" />
        <div className="BottomBar">
          <div className="BottomBar-center">
            <div className="BottomBar-label">CURRENT APPROVED PAY TOTAL:</div>
            <div className="BottomBar-value">{formatUsd(selectedTransactionsSummaryValue)}</div>
            <div className="BottomBar-action">
              <div className="BottomBar-contractors-count">
                {selectedContractorsCount}{' '}
                {selectedContractorsCount > 1 ? 'Contractors' : 'Contractor'}
              </div>
              <div className="BottomBar-btn">
                <Button type="primary" onClick={onSubmit}>
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BottomBar;
