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
} from '~utils/time';

import './Filters.css';

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
  // static propTypes = {
  //   busiestDay: PropTypes.string,
  //   totalPayments: PropTypes.string,
  // };

  state = {
    period: PERIODS.ONE_WEEK,
    currentFormattedPeriod: {
      startDate: '',
      endDate: '',
    },
    startate: '',
    endDate: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('prevState', prevState);
    const { period } = prevState;

    console.log('asd', getTimeRange(period));
    return getTimeRange(period);
  }

  render() {
    const { period, currentFormattedPeriod } = this.state;

    return (
      <div className="Filters">
        <div className="Filters-selector">
          <Dropdown
            options={[PERIODS.ONE_WEEK, PERIODS.TWO_WEEKS, PERIODS.MONTH]}
            onClick={this.handlePeriodChange}>
            <Button type="primary" ghost>
              {period} <Icon type="down" />
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
    console.log('new period', newPeriod, getTimeRange(newPeriod));

    this.setState({ ...getTimeRange(newPeriod), period: newPeriod });
  };

  handlePrevPeriod = () => {
    console.log('prev period');
  };

  handleNextPeriod = () => {
    console.log('next period');
  };
}
