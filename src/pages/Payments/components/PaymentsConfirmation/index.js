import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import './PaymentsConfirmation.css';
import { PeriodCard } from "./components/PeriodCard";

export class PaymentsConfirmation extends React.Component {
  static propTypes = {
  };

  state = {
  };

  render() {
    return (
      <div className="Payments-confirmation">
        <div style={{width: '50%', padding: '10px', display: 'inline-block'}}>
          <PeriodCard active={false} approved={10} postponed={5} range={'Sept 1 - Sept 15'} title={'Last period payments'} total={32.200}/>
        </div>
        <div style={{width: '50%', padding: '10px', display: 'inline-block'}}>
          <PeriodCard active={true} approved={12} postponed={2} range={'Sept 16 - Sept 21'} title={'This period payments'} total={10.500}/>
        </div>
      </div>
    );
  }
}

const mapDispatch = ({});

export default connect(null, mapDispatch)(PaymentsConfirmation);
