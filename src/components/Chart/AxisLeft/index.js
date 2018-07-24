import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AxisLeft as VXAxisLeft } from '@vx/axis';

export default class AxisLeft extends Component {
  static propTypes = {
    themeColors: PropTypes.object,
  };

  render() {
    const { themeColors, ...otherProps } = this.props;

    return (
      <VXAxisLeft
        stroke={themeColors.gridColor}
        tickLabelProps={() => ({
          fontSize: 14,
          fill: themeColors.text,
          textAnchor: 'end',
          dx: '-0.25em',
          dy: '0.25em',
        })}
        tickStroke={themeColors.gridColor}
        {...otherProps}
      />
    );
  }
}
