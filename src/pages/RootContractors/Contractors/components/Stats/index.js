import React from 'react';
import { Progress } from 'antd';

import classnames from 'classnames';
import Box from '../../../../../components/Box/index';

import './Stats.css';

const MockData = [
  { type: 'active', count: 1390 },
  { type: 'resting', count: 1110 },
  { type: 'inactive', count: 180 },
];
const generateStatsItem = list => {
  const types = {
    active: false,
    resting: false,
    inactive: false,
  };
  return list.map(item => {
    types[item.type] = true;
    return (
      <div className="Stats__row" key={item.type}>
        <div className="Stats__count">{item.count}</div>
        <div
          className={classnames('Stats__type', {
            'Stats--active': types.active,
            'Stats--resting': types.resting,
            'Stats--inactive': types.inactive,
          })}>
          {item.type}
        </div>
        <div
          className={classnames('Stats__progress', {
            'Stats--active': types.active,
            'Stats--resting': types.resting,
            'Stats--inactive': types.inactive,
          })}>
          <Progress percent={item.percent} />
        </div>
      </div>
    );
  });
};

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statsData: [],
    };

    this.generateStatsItem = generateStatsItem;
  }

  componentDidMount() {
    this.setState({ statsData: this.prepareData(MockData) });
  }

  prepareData(data) {
    const total = data.reduce((total, amount) => ({ count: total.count + amount.count }));
    return data.map(item => {
      item.percent = parseInt((100 * item.count / total.count).toFixed(0));
      return item;
    });
  }

  render() {
    return (
      <div className="Stats">
        <Box className="Stats__box">{this.generateStatsItem(this.state.statsData)}</Box>
      </div>
    );
  }
}
export default Stats;
