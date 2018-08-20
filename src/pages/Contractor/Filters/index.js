import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import moment from 'moment';

import Dropdown from '~components/Dropdown';

import {
  PERIODS,
  getCurrentWeekPeriod,
  getCurrentTwoWeeksPeriod,
  getCurrentMonthPeriod,
  movePeriod,
} from '~utils/time';

import './Filters.css';

const readablePeriods = {
  [PERIODS.ONE_WEEK]: 'ONE WEEK',
  [PERIODS.TWO_WEEKS]: 'TWO WEEKS',
  [PERIODS.MONTH]: 'MONTH',
};

const getTimeRange = period => {
  if (period === PERIODS.ONE_WEEK) {
    return getFormattedTimePeriod(getCurrentWeekPeriod);
  } else if (period === PERIODS.TWO_WEEKS) {
    return getFormattedTimePeriod(getCurrentTwoWeeksPeriod);
  } else if (period === PERIODS.MONTH) {
    return getFormattedTimePeriod(getCurrentMonthPeriod);
  }
};

const getFormattedTimePeriod = getPeriod => {
  const { startDate, endDate } = getPeriod();

  return {
    startDate,
    endDate,
    currentFormattedPeriod: {
      startDate: startDate.format('MMM DD'),
      endDate: endDate.format('MMM DD'),
    },
  };
};

export default class Filters extends React.Component {
  state = {
    period: PERIODS.ONE_WEEK,
    currentFormattedPeriod: {
      startDate: '',
      endDate: '',
    },
    startDate: '',
    endDate: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { period } = prevState;

    return getTimeRange(period);
  }

  render() {
    const { period, currentFormattedPeriod } = this.state;

    return (
      <div className="Filters">
        <div className="Filters-selector">
          <Dropdown
            options={[
              { key: PERIODS.ONE_WEEK, value: readablePeriods[PERIODS.ONE_WEEK] },
              { key: PERIODS.TWO_WEEKS, value: readablePeriods[PERIODS.TWO_WEEKS] },
              { key: PERIODS.MONTH, value: readablePeriods[PERIODS.MONTH] },
            ]}
            onClick={this.handlePeriodChange}>
            <Button type="primary" ghost>
              {readablePeriods[period]} <Icon type="down" />
            </Button>
          </Dropdown>
        </div>

        <div className="Filters-period-switcher">
          <div className="Filters-previous-btn" onClick={this.handlePrevPeriod}>
            <Icon type="left" />
          </div>
          <div className="Filters-period">
            {currentFormattedPeriod.startDate} - {currentFormattedPeriod.endDate}
          </div>
          <div className="Filters-next-btn" onClick={this.handleNextPeriod}>
            <Icon type="right" />
          </div>
        </div>
      </div>
    );
  }

  handlePeriodChange = newPeriod => {
    console.log('newPeriod', newPeriod);
    this.setState({ ...getTimeRange(newPeriod), period: newPeriod });
  };

  handlePrevPeriod = () => {
    const { period, startDate, endDate } = this.state;

    this.setState({ ...movePeriod(period, startDate, endDate, 'prev') });
  };

  handleNextPeriod = () => {
    const { period, startDate, endDate } = this.state;

    this.setState({ ...movePeriod(period, startDate, endDate, 'next') });
  };
}
