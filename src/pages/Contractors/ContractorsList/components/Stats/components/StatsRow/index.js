import React from 'react';
import { Progress } from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './StatsRow.css';

class StatsRow extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    count: PropTypes.number,
    percent: PropTypes.number,
    types: PropTypes.object,
  };

  render() {
    const { type, count, percent, types } = this.props;
    return (
      <div className="StatsRow__row" key={type}>
        <div className="StatsRow__count">{count}</div>
        <div
          className={classnames('StatsRow__type', {
            'StatsRow--active': types.active,
            'StatsRow--inactive': types.inactive,
            'StatsRow--resting': types.resting,
          })}>
          {type}
        </div>
        <div
          className={classnames('StatsRow__progress', {
            'StatsRow--active': types.active,
            'StatsRow--inactive': types.inactive,
            'StatsRow--resting': types.resting,
          })}>
          <Progress percent={percent} successPercent={-1} type="line"/>
        </div>
      </div>
    );
  }
}

export default StatsRow;
