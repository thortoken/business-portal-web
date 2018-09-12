import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Select } from 'antd';

import './PaymentsConfirmation.css';
import { PeriodCard } from './components/PeriodCard';

import { getCurrentTwoWeeksPeriod } from '~utils/time';
import { formatUsd } from '~utils/number';

const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export class PaymentsConfirmation extends React.Component {
  static propTypes = {
    selectedTransactionsSummaryValue: PropTypes.number,
    selectedTransactionsIds: PropTypes.object,
    selectedContractorsIds: PropTypes.object,
  };

  state = {};

  render() {
    const {
      selectedTransactionsSummaryValue,
      selectedTransactionsIds,
      selectedContractorsIds,
    } = this.props;
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
        <div className="Payments-confirmation__summary">
          <span className="Payments-confirmation__summary--text">Current approved pay total:</span>
          <span className="Payments-confirmation__summary--amount">
            {formatUsd(selectedTransactionsSummaryValue)}
          </span>
          <span className="Payments-confirmation__summary__submit">
            <div className="Payments-confirmation__summary--contractors">
              {selectedContractorsIds.size}{' '}
              {selectedContractorsIds.size > 1 ? 'Contractors' : 'Contractor'}
            </div>
            <div className="Payments-confirmation__summary--button">
              <Button type="default">Confirm Payment</Button>
            </div>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTransactionsIds: state.payments.selectedTransactionsIds,
  selectedContractorsIds: state.payments.selectedContractorsIds,
  selectedTransactionsSummaryValue: state.payments.selectedTransactionsSummaryValue,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsConfirmation);
