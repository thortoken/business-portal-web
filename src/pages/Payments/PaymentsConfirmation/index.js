import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon, Select, Spin } from 'antd';

import './PaymentsConfirmation.css';
import { PeriodCard } from './components/PeriodCard';

import { getCurrentTwoWeeksPeriod } from '~utils/time';
import { formatUsd } from '~utils/number';
import { PayNow } from './components/PayNow';

const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export class PaymentsConfirmation extends React.Component {
  static propTypes = {
    selectedTransactionsSummaryValue: PropTypes.number,
    selectedTransactionsIds: PropTypes.object,
    selectedContractorsIds: PropTypes.object,
    transactionList: PropTypes.object,
  };

  state = {
    transactionList: new Set(),
    submitted: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.transactionList.size !== prevState.transactionList.size) {
      return {
        transactionList: nextProps.transactionList,
      };
    }
    return null;
  }

  handleSubmit = async () => {
    const { selectedTransactionsIds, payNow } = this.props;
    this.setState({ submitted: true });
    try {
      await payNow(selectedTransactionsIds);
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      }
    }
  };

  render() {
    const {
      selectedTransactionsSummaryValue,
      selectedTransactionsIds,
      selectedContractorsIds,
      isLoading,
    } = this.props;
    const { transactionList, submitted } = this.state;
    return (
      <div className="Payments-confirmation">
        <div className="Payments-confirmation__card" style={{ display: 'none' }}>
          <PeriodCard
            active={false}
            approved={10}
            postponed={5}
            range={getCurrentTwoWeeksPeriod()}
            title={'Last period payments'}
            total={32.2}
          />
        </div>
        {!submitted && (
          <div className="Payments-confirmation__card">
            <PeriodCard
              active
              approved={selectedTransactionsIds.size}
              postponed={0}
              range={getCurrentTwoWeeksPeriod()}
              title={'This period payments'}
              total={selectedTransactionsSummaryValue}
            />
          </div>
        )}

        {submitted && (
          <div className="Payments-confirmation__card">
            <PayNow
              active
              title={'Transferring Payments'}
              left={transactionList.size}
              all={selectedTransactionsIds.size}
            />
          </div>
        )}
        <div className="Payments-confirmation__methods" style={{ display: 'none' }}>
          <span className="Payments-confirmation__methods--text">Payments will be released: </span>
          <Select
            defaultValue="immediately"
            className="Payments-confirmation__methods--select"
            onChange={handleChange}>
            <Option value="immediately">Immediately</Option>
            <Option value="later">Later</Option>
          </Select>
        </div>
        {!submitted && (
          <div className="Payments-confirmation__summary">
            <span className="Payments-confirmation__summary--text">
              Current approved pay total:
            </span>
            <span className="Payments-confirmation__summary--amount">
              {formatUsd(selectedTransactionsSummaryValue)}
            </span>
            <span className="Payments-confirmation__summary__submit">
              <div className="Payments-confirmation__summary--contractors">
                {selectedContractorsIds.size}{' '}
                {selectedContractorsIds.size > 1 ? 'Contractors' : 'Contractor'}
              </div>
              <div className="Payments-confirmation__summary--button">
                <Button type="default" onClick={this.handleSubmit}>
                  Confirm Payment
                </Button>
              </div>
            </span>
          </div>
        )}
        {submitted && (
          <div className="Payments-confirmation__loader">
            <Spin size="large" spinning={isLoading} />
            {submitted &&
              !isLoading && <Icon type="check" className="Payments-confirmation__success" />}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTransactionsIds: state.payments.selectedTransactionsIds,
  transactionList: state.payments.transactionList,
  selectedContractorsIds: state.payments.selectedContractorsIds,
  selectedTransactionsSummaryValue: state.payments.selectedTransactionsSummaryValue,
  isLoading: state.loading.effects.payments.payNow,
});

const mapDispatchToProps = dispatch => ({
  payNow: dispatch.payments.payNow,
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsConfirmation);
