import React from 'react';
import { Icon, Radio, Row, Col, Table } from 'antd';

import Box from '~components/Box';
import Header from '~components/Header';
import Filters from './Filters';

import { upperCaseFirst } from '~utils/string';
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

  state = {
    type: 'payments',
  };

  render() {
    const { type } = this.state;

    const headerTitle = type === 'unified' ? 'Payments + Revenue' : upperCaseFirst(type);

    return (
      <div>
        <Header title={headerTitle} size="large">
          <Header.Right>
            <Radio.Group name="type" size="large" value={type} onChange={this.handleTypeChange}>
              <Radio.Button value="revenue">Revenue</Radio.Button>
              <Radio.Button value="payments">Payments</Radio.Button>
              <Radio.Button value="unified">Unified</Radio.Button>
            </Radio.Group>
          </Header.Right>
        </Header>
        <Header title="April 2018" size="small" />
        <Box transparent>
          <Filters />
        </Box>
        <Box transparent>
          <img src="images/thor_charts.png" style={{ marginBottom: '2rem' }} />
        </Box>
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
            <Column
              title="Paid"
              dataIndex="paid"
              render={this.renderAmount}
              sorter={numberSorter}
            />
            <Column title={<DateTitle />} dataIndex="date" render={x => x.toLocaleDateString()} />
          </Table>
        </Box>
      </div>
    );
  }

  handleTypeChange = e => this.setState({ type: e.target.value });

  renderContractor = contractor => (
    <div>
      <Icon type="user" /> {contractor}
    </div>
  );
  renderAmount = amount => `$${amount.toFixed(2)}`;
}
export default Payments;
