import React from 'react';
import { Button, Icon } from 'antd';

import Dropdown from '~components/Dropdown';

import {
  PERIODS,
  getCurrentWeekPeriod,
  getCurrentTwoWeeksPeriod,
  getCurrentMonthPeriod,
  movePeriod,
} from '~utils/time';

import './Filters.scss';

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
  constructor(props) {
    super(props);

    this.state = this.getNewState(PERIODS.ONE_WEEK);
    this.handleFiltersChange(this.state);
  }

  render() {
    const { children } = this.props;
    const { period, currentFormattedPeriod } = this.state;

    const periodOptions = Object.entries(readablePeriods).map(([key, value]) => ({ key, value }));

    return (
      <div className="Filters">
        <div className="Filters-selector">
          <Dropdown options={periodOptions} onClick={this.handlePeriodChange}>
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

        <div className="Filters-right-action">{children}</div>
      </div>
    );
  }

  getNewState = newPeriod => ({
    ...getTimeRange(newPeriod),
    period: newPeriod,
  });

  handleFiltersChange = ({ startDate, endDate, period }) => {
    this.props.onPeriodChange({ startDate, endDate, period });
  };

  handlePeriodChange = newPeriod => {
    const localState = this.getNewState(newPeriod);

    this.setState(localState);
    this.handleFiltersChange(localState);
  };

  handlePrevPeriod = () => {
    this.changePeriodAction('prev');
  };

  handleNextPeriod = () => {
    this.changePeriodAction('next');
  };

  changePeriodAction = direction => {
    const { period, startDate, endDate } = this.state;
    const newPeriod = { ...movePeriod(period, startDate, endDate, direction) };

    this.setState(newPeriod);
    this.handleFiltersChange(newPeriod);
  };
}
