import React from 'react';
import PropTypes from 'prop-types';
import { formatUsd } from '~utils/number';

import './ContractorSummary.css';

const ContractorSummary = ({ summary }) => {
  return (
    <div className="ContractorSummary">
      <div className="ContractorSummary-labels">
        <div>Rank</div>
        <div>Num Jobs</div>
        <div>Prev</div>
        <div>Current</div>
        <div>YTD EARNINGS</div>
      </div>
      <div className="ContractorSummary-values">
        <div>{summary.rank}</div>
        <div>{summary.numOfJobs}</div>
        <div>{formatUsd(summary.prev)}</div>
        <div>{formatUsd(summary.current)}</div>
        <div>{formatUsd(summary.yearly)}</div>
      </div>
    </div>
  );
};

ContractorSummary.propTypes = {
  summary: PropTypes.shape({
    rank: PropTypes.number.isRequired,
    numOfJobs: PropTypes.number.isRequired,
    prev: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    yearly: PropTypes.number.isRequired,
  }),
};

export default ContractorSummary;
