import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import Chart from '~components/Chart';
import withTheme from '~components/Chart/withTheme';

import './ChartCard.scss';

export class ChartCard extends React.Component {
  static propTypes = {
    aggregatedValue: PropTypes.string,
    themeColors: PropTypes.shape({
      accent: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string,
  };

  render() {
    const { title, aggregatedValue, themeColors, ...chartProps } = this.props;
    return (
      <div className="ChartCard">
        <header className="ChartCard-header">
          <div className="ChartCard-title" style={{ color: themeColors.text }}>
            <Icon type="area-chart" style={{ color: themeColors.accent }} /> {title}
          </div>
          <div className="ChartCard-aggregated-value" style={{ color: themeColors.accent }}>
            {aggregatedValue}
          </div>
        </header>
        <div className="ChartCard-chart">
          <Chart themeColors={themeColors} {...chartProps} />
        </div>
      </div>
    );
  }
}

export default withTheme(ChartCard);
