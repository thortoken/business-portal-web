import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Icon, Button } from 'antd';

import { syncPayments } from '~redux/actions/dashboard';

import Card from '~components/Card';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.syncPayments();
  }

  render() {
    return (
      <div className="dashboard">
        <div className="header">Dashboard</div>
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
        <ul>{this.props.payments.map(payment => <li key={payment.id}>{payment.amount}</li>)}</ul>
      </div>
    );
  }
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
