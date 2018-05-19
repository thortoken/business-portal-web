import React from 'react';
import { Icon, Table } from 'antd';

import Box from '~components/Box';

import mockData from './mockData';

const { Column } = Table;

const numberSorter = (a, b) => a.transId - b.transId;

const DateTitle = () => {
  return (
    <span>
      <Icon type="calendar" /> Date
    </span>
  );
};

class Payments extends React.Component {
  static defaultProps = {
    payments: mockData(30),
  };

  render() {
    return (
      <Box>
        <Table dataSource={this.props.payments}>
          <Column title="Trans. ID" dataIndex="transId" sorter={numberSorter} />
          <Column title="Customer ID" dataIndex="customerId" />
          <Column
            title="Received"
            dataIndex="received"
            render={this.renderAmount}
            sorter={numberSorter}
          />
          <Column title="Trans. ID" dataIndex="transId2" sorter={numberSorter} />
          <Column title="Contractor" dataIndex="contractor" render={this.renderContractor} />
          <Column title="Paid" dataIndex="paid" render={this.renderAmount} sorter={numberSorter} />
          <Column title={<DateTitle />} dataIndex="date" render={x => x.toLocaleDateString()} />
        </Table>
      </Box>
    );
  }

  renderContractor = contractor => (
    <div>
      <Icon type="user" /> {contractor}
    </div>
  );
  renderAmount = amount => `$${amount.toFixed(2)}`;
}
export default Payments;
