import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { formatUsd } from '~utils/number';

import './PeriodCard.css';

export class PeriodCard extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    title: PropTypes.string,
    range: PropTypes.object,
    approved: PropTypes.number,
    postponed: PropTypes.number,
    total: PropTypes.number,
  };

  state = {
    postponed: 0,
    postponedList: [],
  };

  render() {
    const { active, title, range, approved, postponed, total } = this.props;
    return (
      <div className={classnames('Period-card', { [`Period-card--active`]: active })}>
        <div className={classnames('Period-card__header', { [`Period-card--value`]: active })}>
          {title}
        </div>
        <div className="Period-card__row">
          {range.startDate.format('YYYY-MMM-Do')} - {range.endDate.format('YYYY-MMM-Do')}
        </div>
        <div className="Period-card__row">
          Payments Approved:{' '}
          <span className={classnames({ [`Period-card--value`]: active })}>{approved}</span>
        </div>
        <div className="Period-card__row" style={{ display: 'none' }}>
          Payments Postponed:{' '}
          <span className={classnames({ [`Period-card--value`]: active })}>{postponed}</span>
        </div>
        <div className="Period-card__row">
          Total Payments:{' '}
          <span className={classnames({ [`Period-card--amount`]: active })}>
            {formatUsd(total)}
          </span>
        </div>
      </div>
    );
  }
}

const mapDispatch = {};

export default connect(null, mapDispatch)(PeriodCard);
