import React, { Component } from 'react';
import { Button, Icon } from 'antd';

import AreaChart from '~components/Chart/AreaChart';
import Chart from '~components/Chart';
import Header from '~components/Header';
import Progress from '~components/Progress';

import { formatUsd } from '../../utils/number';

import './Overview.css';

export class OverviewPage extends Component {
  render() {
    const userName = 'Yoshi';
    const signedUpContractors = 260;
    const allContractors = 1001;
    const paymentsTotal = 90974.54;
    const paymentsMonthName = 'August';

    return (
      <div className="Overview">
        <Header
          title={`Good Morning, ${userName}!`}
          size="medium"
          description="Here's an overview of your registered contractors and Thor Lightning Payments"
        />

        <div className="Overview-contractors">
          <div className="Overview-contractors-progress">
            <Icon type="user" />
            <Progress percent={parseInt(signedUpContractors / allContractors * 100, 10)} />
          </div>
          <p>
            {signedUpContractors} of {allContractors} contractors have signed up for Thor Lightning
            Payments.
          </p>
          <Button type="primary">Send another invite to non-sign ups</Button>
        </div>

        <div className="Overview-payments">
          <h3>Payment Transactions</h3>
          <p>
            <span className="Overview-payments-total">{formatUsd(paymentsTotal)}</span> has been
            paid out to contractors to date in{' '}
            <span className="Overview-payments-total">{paymentsMonthName}</span>
          </p>
          <div className="Overview-payments-chart">
            <Chart
              component={AreaChart}
              height={256}
              theme="blue"
              margin={{ top: 40, bottom: 40, left: 60, right: 0 }}
              style={{ marginLeft: -60 }}
            />
          </div>
          <Button type="primary">View Details &rarr;</Button>
        </div>
      </div>
    );
  }
}

export default OverviewPage;
