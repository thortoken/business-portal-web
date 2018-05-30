import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Button, Divider } from 'antd';

import { syncTransactions } from '~redux/actions/transactions';
import { syncWallet, syncExchangeRates } from '~redux/actions/wallet';

import Box from '~components/Box';
import Card from '~components/Card';
import Header from '~components/Header';
import Dropdown from '~components/Dropdown';
import SurveySlider from '~components/SurveySlider';
import ChartCard from '~components/ChartCard';
import AreaChart from '~components/Chart/AreaChart';

class Dashboard extends React.Component {
  state = {
    transactionsPeriod: 'MONTH',
  };

  componentDidMount() {
    this.props.syncTransactions();
    this.props.syncWallet();
    this.props.syncExchangeRates();
  }

  render() {
    const { transactionsPeriod } = this.state;
    const { transactions } = this.props;

    const { usd, thor, thorAsUsd, total } = this.calcWalletBalance();

    return (
      <div className="dashboard">
        <Header title="Account Summary">
          <Header.Right>
            <Button size="large" ghost>
              Manage Accounts
            </Button>
          </Header.Right>
        </Header>
        <Row gutter={32}>
          <Col xs={24} lg={8}>
            <Card
              description="USD Wallet Balance"
              icon={<Icon type="pie-chart" />}
              title={`$${usd.toFixed(2)}`}
              color="black"
              rounded>
              <Button size="large" ghost>
                Transfer to Bank
              </Button>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card
              description={`${thor} THOR`}
              icon={<Icon type="pie-chart" />}
              title={`$${thorAsUsd.toFixed(2)}`}
              color="blue"
              rounded>
              <Button size="large" ghost>
                BUY / SELL
              </Button>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card
              description="Account Value"
              title={`$${total.toFixed(2)}`}
              color="green"
              rounded
            />
          </Col>
        </Row>
        <Divider />
        <Header title="Recent Transactions" size="small">
          <Header.Left>
            <Dropdown
              options={['DAY', 'MONTH', 'YEAR']}
              onClick={this.handleTransactionsPeriodChange}>
              <Button size="large" type="primary" ghost>
                {transactionsPeriod} <Icon type="down" />
              </Button>
            </Dropdown>{' '}
            <Button size="large" type="primary">
              Create Report
            </Button>
          </Header.Left>
          <Header.Right>
            <Link to="#">View All Transactions &rarr;</Link>
          </Header.Right>
        </Header>
        <Row gutter={32}>
          <Col lg={12}>
            <Box>
              <ChartCard
                component={AreaChart}
                height="100"
                title="Revenue"
                aggregatedValue="$135,067.89"
                theme="green"
              />
            </Box>
          </Col>
          <Col lg={12}>
            <Box>
              <ChartCard
                component={AreaChart}
                height="100"
                title="Transactions"
                aggregatedValue="$90,874.54"
                theme="blue"
              />
            </Box>
          </Col>
        </Row>
        <Divider />
        <Header title="Satisfaction Rates" size="small">
          <Header.Left>
            <Button size="large" type="primary">
              Conduct Survey
            </Button>
          </Header.Left>
          <Header.Right>
            <Link to="#">View All Surveys &rarr;</Link>
          </Header.Right>
        </Header>
        <div>
          <Row gutter={32}>
            <Col xs={24} lg={8}>
              <Box>
                <SurveySlider
                  description="How satisfied are you with our new product?"
                  max={100}
                  min={0}
                  onAfterChange={value => {
                    console.log('Slider after change', value);
                  }}
                  votesCount={25}
                />
              </Box>
            </Col>
            <Col xs={24} lg={8}>
              <Box>
                <SurveySlider
                  description="How satisfied are you with your workload?"
                  max={100}
                  min={0}
                  onAfterChange={value => {
                    console.log('Slider after change', value);
                  }}
                  votesCount={31}
                />
              </Box>
            </Col>
            <Col xs={24} lg={8}>
              <Box>
                <SurveySlider
                  description="Would you recommend working for Luber to a friend?"
                  max={100}
                  min={0}
                  onAfterChange={value => {
                    console.log('Slider after change', value);
                  }}
                  votesCount={46}
                />
              </Box>
            </Col>
          </Row>
        </div>
        <ul>{transactions.map(payment => <li key={payment.id}>{payment.amount}</li>)}</ul>
      </div>
    );
  }

  handleTransactionsPeriodChange = newPeriod => {
    console.log('handleTransactionsPeriodChange', newPeriod);
    this.setState({
      transactionsPeriod: newPeriod,
    });
  };

  calcWalletBalance = () => {
    const { wallet, exchangeRates } = this.props;

    const exchangeRate = exchangeRates['thor-usd'].rate || 0;
    const usd = wallet.EUSD || 0;
    const thor = wallet.THOR || 0;
    const thorAsUsd = thor * exchangeRate;
    return {
      usd,
      thor,
      thorAsUsd,
      total: usd + thorAsUsd,
    };
  };
}

const mapStateToProps = state => ({
  transactions: state.transactions.transactions,
  wallet: state.wallet.wallet,
  exchangeRates: state.wallet.exchangeRates,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      syncTransactions,
      syncWallet,
      syncExchangeRates,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
