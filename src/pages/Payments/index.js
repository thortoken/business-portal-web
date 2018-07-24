import React from 'react';
import { Icon, Table, Tag } from 'antd';

import Box from '~components/Box';
import Header from '~components/Header';
import Chart from '~components/Chart';
import AreaChart from '~components/Chart/AreaChart';
import Filters from './Filters';

import mockData from './mockData';
import { formatUsd } from '../../utils/number';

import './Payments.css';

const { Column } = Table;

const numberSorter = (a, b) => a.transId - b.transId;

const TitleWithIcon = ({ title, icon }) => {
  return (
    <span>
      <Icon type={icon} /> {title}
    </span>
  );
};

class Payments extends React.Component {
  static defaultProps = {
    payments: mockData(30),
  };

  render() {
    const totalPayments = formatUsd(90874.54);
    const busiestDay = 'Saturday';

    return (
      <div>
        <Header title="Payments" size="medium" />

        <Box transparent>
          <Filters totalPayments={totalPayments} busiestDay={busiestDay} />
        </Box>

        <Box transparent>
          <Chart component={AreaChart} height={256} theme="blue" />
        </Box>

        <Box>
          <Table dataSource={this.props.payments} bordered>
            <Column
              align="center"
              dataIndex="serviceDate"
              render={x => x.toLocaleDateString()}
              title="Service Date"
            />
            <Column
              align="center"
              className="Payments-table-service"
              dataIndex="service"
              render={x => x.map(s => <Tag key={s}>{s}</Tag>)}
              title="Service"
            />
            <Column
              align="right"
              dataIndex="payment"
              render={this.renderAmount}
              title={<TitleWithIcon title="Payment" icon="dollar" />}
            />
            <Column
              align="center"
              dataIndex="contractor"
              title={<TitleWithIcon title="Contractor" icon="user" />}
            />
            <Column align="center" dataIndex="city" title="City" />
            <Column
              align="center"
              dataIndex="date"
              render={x => x.toLocaleDateString()}
              title={<TitleWithIcon title="Date" icon="calendar" />}
            />
            <Column render={() => null} title={<Icon type="plus" />} width={30} />
          </Table>
        </Box>
      </div>
    );
  }

  handleTypeChange = e => this.setState({ type: e.target.value });

  renderAmount = amount => `$${amount.toFixed(2)}`;
}
export default Payments;
