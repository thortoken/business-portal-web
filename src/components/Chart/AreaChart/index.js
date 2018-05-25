import React from 'react';
import { curveCardinal } from '@vx/curve';
import { AreaClosed } from '@vx/shape';

export default class AreaChart extends React.Component {
  render() {
    const { data, x, y, xScale, yScale, themeColors } = this.props;

    return (
      <AreaClosed
        data={data}
        xScale={xScale}
        yScale={yScale}
        x={x}
        y={y}
        strokeWidth={1}
        stroke={themeColors.lineColor}
        fill={themeColors.areaBackground}
        curve={curveCardinal.tension(0.5)}
      />
    );
  }
}
