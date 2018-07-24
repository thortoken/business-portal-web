import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Input } from 'antd';
import moment from 'moment';

import DateSwitcher from '~components/DateSwitcher';
import Dropdown from '~components/Dropdown';

import './Filters.css';

export default class Filters extends React.Component {
  static propTypes = {
    busiestDay: PropTypes.string,
    totalPayments: PropTypes.string,
  };

  state = {
    interval: 'MONTH',
    date: moment('2018-08-01'),
  };

  render() {
    const { interval, date } = this.state;
    const { totalPayments, busiestDay } = this.props;

    return (
      <div className="Filters">
        <div className="Filters-form Filters-row">
          <div className="Filters-interval-selector">
            <Dropdown options={['DAY', 'MONTH', 'YEAR']} onClick={this.handlePeriodChange}>
              <Button type="primary">
                {interval} <Icon type="down" />
              </Button>
            </Dropdown>
          </div>
          <Input
            className="Filters-search"
            placeholder="Search..."
            prefix={<Icon type="search" />}
            suffix={<Icon type="question-circle" />}
            onPressEnter={this.handleSearch}
          />
          <Button type="primary">Download CSV</Button>
        </div>

        <div className="Filters-chart-summary Filters-row">
          <DateSwitcher
            date={date}
            interval={interval.toLowerCase()}
            className="Filters-date-selector"
            onChange={this.handleDateChange}
          />
          <div className="Filters-chart-summary-item">
            Total Payments: <span>{totalPayments}</span>
          </div>
          <div className="Filters-chart-summary-item">
            Busiest day on average: <span>{busiestDay}</span>
          </div>
        </div>
      </div>
    );
  }

  handlePeriodChange = newPeriod => {
    this.setState({ interval: newPeriod });
  };

  handleDateChange = newDate => {
    this.setState({ date: newDate });
  };

  handleSearch = value => {
    console.log('Searching for', value);
  };
}
