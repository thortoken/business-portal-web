import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Select, Progress } from 'antd';

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
    transactionErrorList: PropTypes.object,
    transactionsDone: PropTypes.number,
    transactionsError: PropTypes.number,
  };

  state = {
    transactionsDone: 0,
    transactionsError: 0,
    transactionErrorList: new Set(),
    submitted: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.transactionsDone !== prevState.transactionsDone) {
      return {
        transactionsDone: nextProps.transactionsDone,
      };
    }
    if (nextProps.transactionsError !== prevState.transactionsError) {
      return {
        transactionsError: nextProps.transactionsError,
      };
    }
    if (nextProps.transactionErrorList.size !== prevState.transactionErrorList.size) {
      return {
        transactionErrorList: nextProps.transactionErrorList,
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

  handleBack = async () => {
    const { reset } = this.props;
    await reset();
    this.props.history.push(`/payments`);
  };

  render() {
    const {
      selectedTransactionsSummaryValue,
      selectedTransactionsIds,
      selectedContractorsIds,
      isLoading,
    } = this.props;
    const { transactionsDone, transactionsError, submitted, transactionErrorList } = this.state;
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
              done={transactionsDone}
              error={transactionsError}
              all={selectedTransactionsIds.size}
              submitted={submitted}
              errorList={transactionErrorList}
              isLoading={isLoading}
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
                <Button
                  type="default"
                  disabled={selectedTransactionsIds.size === 0}
                  onClick={this.handleSubmit}>
                  Confirm Payment
                </Button>
              </div>
            </span>
          </div>
        )}
        {submitted &&
          !isLoading && (
            <div className="Payments-confirmation__summary">
              <div className="Payments-confirmation__summary--back-button">
                <Button type="default" onClick={this.handleBack}>
                  Back to Payments
                </Button>
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTransactionsIds: state.payments.selectedTransactionsIds,
  transactionErrorList: state.payments.transactionErrorList,
  transactionsDone: state.payments.transactionsDone,
  transactionsError: state.payments.transactionsError,
  selectedContractorsIds: state.payments.selectedContractorsIds,
  selectedTransactionsSummaryValue: state.payments.selectedTransactionsSummaryValue,
  isLoading: state.loading.effects.payments.payNow,
});

const mapDispatchToProps = dispatch => ({
  payNow: dispatch.payments.payNow,
  reset: dispatch.payments.reset,
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsConfirmation);
