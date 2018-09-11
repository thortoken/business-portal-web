import React from 'react';
import { formatUsd } from '~utils/number';

import './ContractorSummary.css';

const ContractorSummary = ({ rank, nJobs, prev, current, ytd }) => {
  return (
    <div className="ContractorSummary">
      <div className="ContractorSummary-labels">
        <div>Rank</div>
        <div>Num Jobs</div>
        <div>Prev</div>
        <div>Selected Period</div>
        <div>YTD EARNINGS</div>
      </div>
      <div className="ContractorSummary-values">
        <div>{rank}</div>
        <div>{nJobs}</div>
        <div>{formatUsd(prev)}</div>
        <div>{formatUsd(current)}</div>
        <div>{formatUsd(ytd)}</div>
      </div>
    </div>
  );
};

export default ContractorSummary;
