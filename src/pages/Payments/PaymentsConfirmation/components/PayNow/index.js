import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import './PayNow.css';

export class PayNow extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    title: PropTypes.string,
    left: PropTypes.number,
    all: PropTypes.number,
  };

  render() {
    const { active, title, left, all } = this.props;
    return (
      <div className={classnames('Period-card', { [`Period-card--active`]: active })}>
        <div className={classnames('Period-card__header', { [`Period-card--value`]: active })}>
          {title}
        </div>
        <div className="Period-card__row">
          Payments Transferred:{' '}
          <span className={classnames({ [`Period-card--value`]: active })}>{all - left}</span>
        </div>
        <div className="Period-card__row">
          Total Payments:{' '}
          <span className={classnames({ [`Period-card--amount`]: active })}>{all}</span>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(PayNow);
