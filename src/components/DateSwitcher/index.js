import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import classNames from 'classnames';
import moment from 'moment';

export const addToDate = (date, interval, value) => {
  const intervalName = `${interval}s`;
  return moment(date).add(value, intervalName);
};

export default class DateSwitcher extends Component {
  static propTypes = {
    className: PropTypes.string,
    date: PropTypes.object,
    interval: PropTypes.oneOf(['day', 'month', 'year']),
  };

  static defaultProps = {
    date: moment(),
    interval: 'month',
  };

  static dateFormats = {
    day: 'MM/DD/YYYY',
    month: 'MMM YYYY',
    year: 'YYYY',
  };

  constructor(props) {
    super(props);

    this.addToDate = addToDate;
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classNames('DateSwitcher', className)}>
        <Button onClick={this.handleDateDecrease}>
          <Icon type="left" />
        </Button>
        <div className="DateSwitcher-value">{this.formatDate()}</div>
        <Button onClick={this.handleDateIncrease}>
          <Icon type="right" />
        </Button>
      </div>
    );
  }

  handleDateIncrease = () => {
    const { date, interval } = this.props;
    const newDate = this.addToDate(date, interval, 1);
    this.handleChange(newDate);
  };

  handleDateDecrease = () => {
    const { date, interval } = this.props;
    const newDate = this.addToDate(date, interval, -1);
    this.handleChange(newDate);
  };

  handleChange = newDate => {
    this.setState({ date: newDate });
    this.props.onChange(newDate);
  };

  formatDate = () => {
    const { date, interval } = this.props;
    return date.format(DateSwitcher.dateFormats[interval]);
  };
}
