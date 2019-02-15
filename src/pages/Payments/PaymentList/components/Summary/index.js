import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import momentPropTypes from 'react-moment-proptypes';
import { formatUsd } from '~utils/number';
import { DateRangePicker } from 'react-dates';
import { getCurrentTwoWeeksPeriod } from '~utils/time';

import './Summary.scss';

class SummaryBox extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    summary: PropTypes.shape({
      total: PropTypes.number.isRequired,
      users: PropTypes.number.isRequired,
    }).isRequired,
    period: PropTypes.oneOf(['prev', 'current']),
    startDate: momentPropTypes.momentObj,
    endDate: momentPropTypes.momentObj,
    onDatesChanged: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { startDate, endDate } = this.state;
    this.props.onDatesChanged({ startDate, endDate });
  }

  state = {
    focusedInput: null,
    ...getCurrentTwoWeeksPeriod(),
  };

  handleOnDatesChanged = ({ startDate, endDate }) => {
    if (startDate && endDate && this.state.endDate !== endDate) {
      this.props.onDatesChanged({ startDate, endDate });
    }
    this.setState({ startDate, endDate });
  };

  handleOnDatePickerClosed = () => {
    const { startDate, endDate } = this.props;
    this.setState({ startDate, endDate });
  };

  handleOnFocusChanged = ({ focusedInput }) => {
    this.setState({ focusedInput });
  };

  render() {
    const { title, summary, period } = this.props;
    const { focusedInput, startDate, endDate } = this.state;

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
                this.handleOnDatesChanged({ startDate, endDate });
              }}
              focusedInput={focusedInput}
              onFocusChange={focusedInput => {
                this.handleOnFocusChanged({ focusedInput });
              }}
              onClose={this.handleOnDatePickerClosed}
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
  }
}

const Summary = ({ previous, current, onDatesChanged, startDate, endDate }) => (
  <div className="Summary">
    {/*<SummaryBox title="PREV" summary={previous} period="prev" />*/}
    <SummaryBox
      title="CURRENT"
      summary={current}
      period="current"
      onDatesChanged={onDatesChanged}
      startDate={startDate}
      endDate={endDate}
    />
  </div>
);

Summary.propTypes = {
  previous: PropTypes.shape({
    total: PropTypes.number.isRequired,
    users: PropTypes.number.isRequired,
  }).isRequired,
  current: PropTypes.shape({
    total: PropTypes.number.isRequired,
    users: PropTypes.number.isRequired,
  }).isRequired,
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChanged: PropTypes.func.isRequired,
};

export default Summary;
