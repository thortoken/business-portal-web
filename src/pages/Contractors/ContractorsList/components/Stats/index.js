import React from 'react';
import { Badge } from 'antd';
import PropTypes from 'prop-types';

import Box from '~components/Box';

import './Stats.css';
import { connect } from 'react-redux';
import StatsRow from "./components/StatsRow";

const generateStatsItem = list => {
  return list.map(item => {
    let types = {
      active: false,
      inactive: false,
      resting: false,
    };
    types[item.type] = true;
    return (
      <StatsRow count={item.count} percent={item.percent} type={item.type} types={types} key={item.type}/>
    );
  });
};

const prepareData = data =>
  Object.entries(data)
    .filter(([key, value]) => value.percent)
    .reduce(
      (acc, [key, value]) => [
        ...acc,
        {
          type: key.toLowerCase(),
          count: parseInt(value.count, 10),
          percent: parseInt(value.percent, 10),
        },
      ],
      []
    );

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
    const { stats: { total }, statsData } = this.state;
    return (
      <div className="Stats">
        <Box className="Stats__box">
          <div className="Stats__header">
            <div className="Stats__row Stats--header">
              <div className="Stats__count Stats__badge">
                <Badge count={total || 0}/>
              </div>
              <div className="Stats__header--type">Total contractors</div>
              <div className="Stats__header--progress"/>
            </div>
          </div>
          {this.generateStatsItem(statsData)}
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
