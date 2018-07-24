import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AxisTop as VXAxisTop } from '@vx/axis';
import { Group } from '@vx/group';

export default class AxisTop extends Component {
  static propTypes = {
    graphHeight: PropTypes.number,
    isLongTick: PropTypes.func,
    skipBorderTicks: PropTypes.bool,
    themeColors: PropTypes.object,
    tickLength: PropTypes.number,
  };

  render() {
    const { skipBorderTicks, themeColors, tickLength, ...otherProps } = this.props;

    return (
      <VXAxisTop
        stroke={themeColors.gridColor}
        tickLabelProps={() => ({ fontSize: 14, fill: themeColors.text, textAnchor: 'start' })}
        tickStroke={themeColors.gridColor}
        tickLength={tickLength}
        {...otherProps}>
        {props => {
          const tickLabelSize = 14;
          const axisCenter = (props.axisToPoint.x - props.axisFromPoint.x) / 2;
          return (
            <g className="my-custom-top-axis">
              {props.ticks.map((tick, i) => {
                // Don't render first and last tick.
                if (skipBorderTicks && (i === 0 || i === props.ticks.length - 1)) {
                  return null;
                }

                if (!tick.formattedValue) {
                  return null;
                }

                const tickLabelX = tick.from.x;
                const tickLabelY = tick.from.y;

                return (
                  <Group key={`vx-tick-${tick.value}-${i}`} className={'vx-axis-tick'}>
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
              <text textAnchor="middle" transform={`translate(${axisCenter}, 50)`} fontSize="8">
                {props.label}
              </text>
            </g>
          );
        }}
      </VXAxisTop>
    );
  }
}
