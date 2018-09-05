import React from 'react';
import { Progress, Badge } from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Box from '~components/Box';

import './Stats.css';
import connect from "react-redux/es/connect/connect";

const generateStatsItem = list => {
  return list.map(item => {
    let types = {
      active: false,
      inactive: false,
      resting: false,
    };
    types[item.type] = true;
    return (
      <div className="Stats__row" key={item.type}>
        <div className="Stats__count">{item.count}</div>
        <div
          className={classnames('Stats__type', {
            'Stats--active': types.active,
            'Stats--inactive': types.inactive,
            'Stats--resting': types.resting,
          })}>
          {item.type}
        </div>
        <div
          className={classnames('Stats__progress', {
            'Stats--active': types.active,
            'Stats--inactive': types.inactive,
            'Stats--resting': types.resting,
          })}>
          <Progress percent={item.percent} successPercent={-1} type="line"/>
        </div>
      </div>
    );
  });
};

const prepareData = (data) => {
  let statsData = [];
  _.forIn(data, (value, key) => {
    if (value.percent) {
      statsData.push({
        type: key.toLowerCase(),
        count: parseInt(value.count, 10),
        percent: parseInt(value.percent, 10)
      });
    }
  });
  return statsData;
};

class Stats extends React.Component {
  static propTypes = {
    stats: PropTypes.object,
  };

  state = {
      statsData: [
        { type: 'active', count: 0, percent: 0 },
        { type: 'inactive', count: 0, percent: 0 },
        { type: 'resting', count: 0, percent: 0 },
      ],
      stats: null
  };

  constructor(props) {
    super(props);

    this.generateStatsItem = generateStatsItem;
  }

  componentDidMount() {
    this.props.getStats();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.stats !== prevState.stats) {
      return {
        stats: nextProps.stats,
        statsData: prepareData(nextProps.stats),
      };
    }
    return null;
  }

  render() {
    const { total } = this.state.stats;
    return (
      <div className="Stats">
        <Box className="Stats__box">
          <div className="Stats__header">
            <div className="Stats__row Stats--header">
              <div className="Stats__count Stats__badge">
                <Badge count={total || 0}/>
              </div>
              <div className="Stats__header--type">Total contractors</div>
              <div className="Stats__header--progress" />
            </div>
          </div>
          {this.generateStatsItem(this.state.statsData)}
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stats: state.tenants.stats,
});

const mapDispatchToProps = dispatch => ({
  getStats: dispatch.tenants.getStats,
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
