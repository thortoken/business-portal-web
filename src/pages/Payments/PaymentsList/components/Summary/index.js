import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import { formatUsd } from '~utils/number';

import './Summary.scss';

const monthAndDayTimeFormatter = time =>
  time && moment(new Date(time).toISOString()).format('MMMM D');

const SummaryBox = ({ title, summary, period }) => {
  return (
    <div className="Summary-box">
      <div className="Summary-title">{title}</div>
      <div className="Summary-details">
        <div
          className={classnames('Summary-value', {
            [`Summary-${period}`]: true,
          })}>
          {summary.total ? formatUsd(summary.total) : ''}
        </div>
        <span>{summary.users} Contractors</span>
        <span>
          {monthAndDayTimeFormatter(summary.startDate)} -{' '}
          {monthAndDayTimeFormatter(summary.endDate)}
        </span>
      </div>
    </div>
  );
};

const Summary = ({ previous, current }) => {
  return (
    <div className="Summary">
      <SummaryBox title="PREV" summary={previous} period="prev" />
      <SummaryBox title="CURRENT" summary={current} period="current" />
    </div>
  );
};

SummaryBox.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.shape({
    total: PropTypes.string.isRequired,
    users: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }),
  period: PropTypes.oneOf(['prev', 'current']),
};

Summary.propTypes = {
  previous: PropTypes.shape({
    total: PropTypes.string.isRequired,
    users: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }).isRequired,
  current: PropTypes.shape({
    total: PropTypes.string.isRequired,
    users: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }).isRequired,
};
export default Summary;
