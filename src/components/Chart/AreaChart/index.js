import React from 'react';
import { curveLinear } from '@vx/curve';
import { Group } from '@vx/group';
import { LinearGradient } from '@vx/gradient';
import { AreaClosed } from '@vx/shape';

export default class AreaChart extends React.Component {
  render() {
    const { data, x, y, xScale, yScale, themeColors, top, left } = this.props;

    return (
      <Group top={top} left={left}>
        <LinearGradient id="linear" from={themeColors.areaBackground} to="#ffffff" />
        <AreaClosed
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          strokeWidth={1}
          stroke={themeColors.lineColor}
          fill="url(#linear)"
          curve={curveLinear}
        />
      </Group>
    );
  }
}
