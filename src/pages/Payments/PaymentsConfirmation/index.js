import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

import './PaymentsConfirmation.css';
import { PeriodCard } from "./components/PeriodCard";
import { Select } from 'antd';

const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export class PaymentsConfirmation extends React.Component {
  static propTypes = {};

  state = {};

  render() {
    return (
      <div className="Payments-confirmation">
        <div className="Payments-confirmation__card">
          <PeriodCard active={false} approved={10} postponed={5} range={'Sept 1 - Sept 15'}
                      title={'Last period payments'} total={32.200}/>
        </div>
        <div className="Payments-confirmation__card">
          <PeriodCard active={true} approved={12} postponed={2} range={'Sept 16 - Sept 21'}
                      title={'This period payments'} total={10.500}/>
        </div>
        <div className="Payments-confirmation__methods">
          <span className="Payments-confirmation__methods--text">Payments will be released: </span>
          <Select defaultValue="immediately" className="Payments-confirmation__methods--select" onChange={handleChange}>
            <Option value="immediately">Immediately</Option>
            <Option value="later">Later</Option>
          </Select>
        </div>
        <div className="Payments-confirmation__summary">
          <span className="Payments-confirmation__summary--text">Current approved pay total:</span>
          <span className="Payments-confirmation__summary--amount">$ 10.500</span>
          <span className="Payments-confirmation__summary__submit">
            <div className="Payments-confirmation__summary--contractors">888 Contractors</div>
            <div className="Payments-confirmation__summary--button">
              <Button type="default">Confirm Payment</Button>
            </div>
          </span>
        </div>
      </div>
    );
  }
}

const mapDispatch = ({});

export default connect(null, mapDispatch)(PaymentsConfirmation);
