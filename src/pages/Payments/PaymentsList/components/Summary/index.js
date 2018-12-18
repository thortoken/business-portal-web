import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import { formatUsd } from '~utils/number';
import { DateRangePicker } from 'react-dates';

import './Summary.scss';

const monthAndDayTimeFormatter = time =>
  time && moment(new Date(time).toISOString()).format('MMMM D');

const SummaryBox = ({
  title,
  summary,
  period,
  startDate,
  endDate,
  onDatesChanged,
  focusedInput,
  onFocusChanged,
}) => {
  return (
    <div className="Summary-box">
      <div className="Summary-title">{title}</div>
      <div className="Summary-details">
        <div
          className={classnames('Summary-value', {
            [`Summary-${period}`]: true,
          })}>
          {/*{summary.total ? formatUsd(summary.total) : ''}*/}
          {formatUsd(summary.total)}
        </div>
        <span>{summary.users} Contractors</span>
        <span>
          <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            startDate={startDate}
            endDate={endDate}
            onDatesChange={({ startDate, endDate }) => {
              onDatesChanged({ startDate, endDate });
            }}
            focusedInput={focusedInput}
            onFocusChange={focusedInput => {
              onFocusChanged({ focusedInput });
            }}
            small
            isOutsideRange={() => false}
            noBorder
            hideKeyboardShortcutsPanel
            displayFormat="MM-DD-YYYY"
            showDefaultInputIcon
            inputIconPosition="before"
          />
        </span>
      </div>
    </div>
  );
};

class Summary extends React.Component {
  static propTypes = {
    previous: PropTypes.shape({
      total: PropTypes.number.isRequired,
      users: PropTypes.number.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    }).isRequired,
    current: PropTypes.shape({
      total: PropTypes.number.isRequired,
      users: PropTypes.number.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    }).isRequired,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
  };

  state = {
    focusedInput: null,
    startDate: null,
    endDate: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.current && nextProps.current !== prevState.current) {
      return {
        startDate: moment(nextProps.current.startDate),
        endDate: moment(nextProps.current.endDate),
      };
    }
  }

  handleOnFocusChanged = ({ focusedInput }) => {
    this.setState({ focusedInput });
  };

  handleOnDatesChanged = ({ startDate, endDate }) => {
    this.setState({
      startDate,
      endDate,
    });
  };

  render() {
    const { previous, current } = this.props;
    const { focusedInput, startDate, endDate } = this.state;

    return (
      <div className="Summary">
        {/*<SummaryBox title="PREV" summary={previous} period="prev" />*/}
        <SummaryBox
          title="CURRENT"
          summary={current}
          period="current"
          startDate={startDate}
          endDate={endDate}
          onDatesChanged={this.handleOnDatesChanged}
          focusedInput={focusedInput}
          onFocusChanged={this.handleOnFocusChanged}
        />
      </div>
    );
  }
}

SummaryBox.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.shape({
    total: PropTypes.number.isRequired,
    users: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }),
  period: PropTypes.oneOf(['prev', 'current']),
};

export default connect(
  null,
  null
)(Summary);
