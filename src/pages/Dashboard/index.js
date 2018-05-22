import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Button, Divider } from 'antd';

import { syncPayments } from '~redux/actions/dashboard';

import Card from '~components/Card';
import Header from '~components/Header';
import Dropdown from '~components/Dropdown';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.syncPayments();
  }

  render() {
    return (
      <div className="dashboard">
        <Header title="Account Summary">
          <Header.Right>
            <Button type="primary" ghost>
              Manage Accounts
            </Button>
          </Header.Right>
        </Header>
        <Row gutter={32}>
          <Col span={8}>
            <Card
              description="USD Wallet Balance"
              icon={<Icon type="pie-chart" />}
              title="$5,000.25"
              color="black"
              rounded>
              <Button ghost>Transfer to Bank</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              description="560 THOR"
              icon={<Icon type="pie-chart" />}
              title="$15,013.6"
              color="blue"
              rounded>
              <Button ghost>BUY / SELL</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card description="Account Value" title="$20,013.65" color="green" rounded />
          </Col>
        </Row>
        <Divider />
        <Header title="Recent Payments" size="small">
          <Header.Left>
            <Dropdown options={['DAY', 'MONTH', 'YEAR']} onClick={this.handlePaymentsPeriodChange}>
              <Button type="primary" ghost>
                MONTH <Icon type="down" />
              </Button>
            </Dropdown>{' '}
            <Button type="primary">Create Report</Button>
          </Header.Left>
          <Header.Right>
            <Link to="#">View All Payments &rarr;</Link>
          </Header.Right>
        </Header>
        <div>
          <img src="/images/thor_charts.png" width="100%" />
        </div>
        <Divider />
        <Header title="Satisfaction Rates" size="small">
          <Header.Left>
            <Button type="primary">Conduct Survey</Button>
          </Header.Left>
          <Header.Right>
            <Link to="#">View All Surveys &rarr;</Link>
          </Header.Right>
        </Header>
        <div>
          <img src="/images/thor_satisfaction_rates.png" width="100%" />
        </div>
        <ul>{this.props.payments.map(payment => <li key={payment.id}>{payment.amount}</li>)}</ul>
      </div>
    );
  }

  handlePaymentsPeriodChange = ({ key }) => {
    console.log('handlePaymentsPeriodChange', key);
  };
}

const mapStateToProps = state => ({
  payments: state.dashboard.payments,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      syncPayments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
