import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AxisBottom as VXAxisBottom } from '@vx/axis';
import { Group } from '@vx/group';
import { Line } from '@vx/shape';

export default class AxisBottom extends Component {
  static propTypes = {
    graphHeight: PropTypes.number,
    isLongTick: PropTypes.func,
    skipBorderTicks: PropTypes.bool,
    themeColors: PropTypes.object,
    tickLength: PropTypes.number,
  };

  render() {
    const {
      graphHeight,
      isLongTick,
      skipBorderTicks,
      themeColors,
      tickLength,
      ...otherProps
    } = this.props;

    return (
      <VXAxisBottom
        stroke={themeColors.gridColor}
        tickLabelProps={() => ({ fontSize: 14, fill: themeColors.text, textAnchor: 'start' })}
        tickStroke={themeColors.gridColor}
        tickLength={tickLength}
        {...otherProps}>
        {props => {
          const tickLabelSize = 14;
          const axisCenter = (props.axisToPoint.x - props.axisFromPoint.x) / 2;
          return (
            <g className="my-custom-bottom-axis">
              {props.ticks.map((tick, i) => {
                // Don't render first and last tick.
                if (skipBorderTicks && (i === 0 || i === props.ticks.length - 1)) {
                  return null;
                }

                const tickLabelX = tick.to.x;
                const tickLabelY = graphHeight + 24;
                const tickYFrom = isLongTick(tick.value) ? 0 : graphHeight - tickLength;

                return (
                  <Group key={`vx-tick-${tick.value}-${i}`} className={'vx-axis-tick'}>
                    <Line
                      from={{ x: tick.from.x, y: tickYFrom }}
                      to={{ x: tick.to.x, y: graphHeight }}
                      stroke={themeColors.gridColor}
                    />
                    <text
                      transform={`translate(${tickLabelX}, ${tickLabelY})`}
                      fontSize={tickLabelSize}
                      textAnchor="middle"
                      fill={themeColors.text}>
                      {tick.formattedValue}
                    </text>
                  </Group>
                );
              })}
              <Line
                from={{
                  x: props.axisFromPoint.x,
                  y: props.axisFromPoint.y + graphHeight,
                }}
                to={{ x: props.axisToPoint.x, y: props.axisToPoint.y + graphHeight }}
                stroke={themeColors.gridColor}
                strokeWidth={1}
              />
              <text textAnchor="middle" transform={`translate(${axisCenter}, 50)`} fontSize="8">
                {props.label}
              </text>
            </g>
          );
        }}
      </VXAxisBottom>
    );
  }
}
