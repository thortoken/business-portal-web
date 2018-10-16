import React from 'react';
import PropTypes from 'prop-types';
import { Line, Bar } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { extent, max, min, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';

import withResponsiveness from './withResponsiveness';
import withTheme from './withTheme';
import AxisBottom from './AxisBottom';
import AxisTop from './AxisTop';
import AxisLeft from './AxisLeft';
import genMockData from './genMockData';

import './Chart.scss';

const formatDayShort = timeFormat('%a');
const formatDateShort = timeFormat('%m/%d');
const formatDate = timeFormat("%A, %b %d, '%y");
const numTicksForWidth = (width, data) => data.length;
const isLongTick = tick => tick.getDay() === 0;

// Accessors
const xSelector = d => new Date(d.date);
const ySelector = d => d.value;
const bisectDate = bisector(d => new Date(d.date)).left;

export class Chart extends React.Component {
  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
    showTooltip: PropTypes.func,
    style: PropTypes.object,
    hideTooltip: PropTypes.func,
    tooltipData: PropTypes.object,
    tooltipTop: PropTypes.number,
    tooltipLeft: PropTypes.number,
    themeColors: PropTypes.object,
  };

  static defaultProps = {
    margin: { top: 40, right: 0, bottom: 40, left: 60 },
    style: {},
  };

  state = {
    chartData: genMockData(20),
  };

  render() {
    const {
      component: ChartComponent,
      width: basicWidth,
      height: basicHeight,
      hideTooltip,
      style,
      tooltipData,
      tooltipTop,
      tooltipLeft,
      themeColors,
    } = this.props;

    const { chartData } = this.state;

    if (basicWidth < 10) {
      return null;
    }

    const margin = { ...Chart.defaultProps.margin, ...this.props.margin };
    const width =
      basicWidth - Math.min(style.marginLeft || 0, 0) - Math.min(style.marginRight || 0, 0);
    const height =
      basicHeight - Math.min(style.marginTop || 0, 0) - Math.min(style.marginBottom || 0, 0);

    // bounds
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    const minY = min(chartData, ySelector);
    const maxY = max(chartData, ySelector);

    // scales
    const xScale = scaleTime({
      range: [0, graphWidth],
      domain: extent(chartData, xSelector),
    });
    const yScale = scaleLinear({
      range: [graphHeight, 0],
      domain: [0, maxY],
      nice: true,
    });

    const tickLength = graphHeight / 4;
    const xValues = chartData.map(xSelector);

    return (
      <div className="Chart" onClick={this.getNewData} style={style}>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={themeColors.background} />
          <ChartComponent
            top={margin.top}
            left={margin.left}
            xScale={xScale}
            yScale={yScale}
            x={xSelector}
            y={ySelector}
            data={chartData}
            themeColors={themeColors}
          />

          <AxisBottom
            graphHeight={graphHeight}
            hideZero
            isLongTick={isLongTick}
            left={margin.left}
            numTicks={numTicksForWidth(width, chartData)}
            scale={xScale}
            skipBorderTicks
            themeColors={themeColors}
            tickFormat={d => formatDayShort(d).substr(0, 1)}
            tickLength={tickLength}
            tickValues={xValues}
            top={margin.top}
          />
          <AxisTop
            hideAxisLine
            isLongTick={isLongTick}
            left={margin.left}
            numTicks={numTicksForWidth(width, chartData)}
            scale={xScale}
            skipBorderTicks
            themeColors={themeColors}
            tickLabelProps={() => ({ fontSize: 14, fill: themeColors.text, textAnchor: 'middle' })}
            tickLength={tickLength}
            tickFormat={d => (isLongTick(d) ? formatDateShort(d) : null)}
            tickValues={xValues}
            top={margin.top - 10}
          />
          <AxisLeft
            left={margin.left}
            scale={yScale}
            themeColors={themeColors}
            numTicks={2}
            tickLength={12}
            tickValues={[minY, maxY]}
            top={margin.top}
          />

          <Bar
            x={margin.left}
            y={margin.top}
            width={graphWidth}
            height={graphHeight}
            fill="transparent"
            data={chartData}
            onTouchStart={data => event =>
              this.handleTooltip({
                event,
                data,
                xSelector,
                xScale,
                yScale,
              })}
            onTouchMove={data => event =>
              this.handleTooltip({
                event,
                data,
                xSelector,
                xScale,
                yScale,
              })}
            onMouseMove={data => event =>
              this.handleTooltip({
                event,
                data,
                xSelector,
                xScale,
                yScale,
              })}
            onMouseLeave={data => event => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: margin.left + tooltipLeft, y: margin.top }}
                to={{ x: margin.left + tooltipLeft, y: margin.top + graphHeight }}
                stroke={themeColors.accent}
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
                strokeDasharray="2,2"
              />
              <circle
                cx={margin.left + tooltipLeft}
                cy={margin.top + tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
              <circle
                cx={margin.left + tooltipLeft}
                cy={margin.top + tooltipTop}
                r={4}
                fill={themeColors.accent}
                stroke="white"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div className="Chart-tooltip-layer">
            <Tooltip
              className="Chart-tooltip-value"
              top={margin.top + tooltipTop}
              left={tooltipLeft}
              style={{
                backgroundColor: themeColors.tooltipBackground,
                color: themeColors.tooltipText,
              }}>
              {`$${ySelector(tooltipData)}`}
            </Tooltip>
            <Tooltip className="Chart-tooltip-x" top={margin.top + graphHeight} left={tooltipLeft}>
              {formatDate(xSelector(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    );
  }

  handleTooltip = ({ event, data, xSelector, xScale, yScale }) => {
    const { margin, showTooltip } = this.props;
    const { x } = localPoint(event);
    const x0 = xScale.invert(x - margin.left);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - xSelector(d0) > xSelector(d1) - x0 ? d1 : d0;
    }

    showTooltip({
      tooltipData: d,
      tooltipLeft: xScale(xSelector(d)),
      tooltipTop: yScale(ySelector(d)),
    });
  };

  /* For testing purposes only. It changes the chart data. */
  getNewData = () => {
    this.setState({ chartData: genMockData(20) });
    console.log('changing data');
  };
}

export default withResponsiveness(withTheme(withTooltip(Chart)));
