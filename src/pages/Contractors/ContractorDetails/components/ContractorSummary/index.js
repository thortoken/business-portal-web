import React from 'react';
import PropTypes from 'prop-types';
import { formatUsd } from '~utils/number';

import './ContractorSummary.css';

const ContractorSummary = ({ rank, numOfJobs, prev, current, yearly }) => {
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
        <div>{rank}</div>
        <div>{numOfJobs}</div>
        <div>{formatUsd(prev)}</div>
        <div>{formatUsd(current)}</div>
        <div>{formatUsd(yearly)}</div>
      </div>
    </div>
  );
};

ContractorSummary.propTypes = {
  rank: PropTypes.number.isRequired,
  numOfJobs: PropTypes.number.isRequired,
  prev: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  yearly: PropTypes.number.isRequired,
};

export default ContractorSummary;
