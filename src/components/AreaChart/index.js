import React from 'react';
import { AreaClosed, Line, Bar } from '@vx/shape';
import { appleStock } from '@vx/mock-data';
import { curveMonotoneX } from '@vx/curve';
import { LinearGradient } from '@vx/gradient';
import { withParentSize } from '@vx/responsive';
import { GridRows, GridColumns } from '@vx/grid';
import { scaleTime, scaleLinear } from '@vx/scale';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { extent, max, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import { Spring } from 'react-spring';

const formatDate = timeFormat("%b %d, '%y");

const Area = ({ xs, ys, xScale, yScale, themeColors }) => {
  return (
    <AreaClosed
      data={xs.map((x, i) => ({ date: x, close: ys[i] }))}
      xScale={xScale}
      yScale={yScale}
      x={xStock}
      y={yStock}
      strokeWidth={1}
      stroke={themeColors.lineColor}
      fill={themeColors.areaBackground}
      curve={curveMonotoneX}
    />
  );
};

// Accessors
const xStock = d => new Date(d.date);
const yStock = d => d.close;
const bisectDate = bisector(d => new Date(d.date)).left;

export class AreaChart extends React.Component {
  static defaultProps = {
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  };

  state = {
    offset: 50,
    stock: appleStock.slice(0, 50),
  };

  static themeColors = {
    green: {
      accent: '#80D134',
      areaBackground: '#B2E29E',
      background: '#FFFFFF',
      lineColor: '#90D742',
      text: '#90D742',
      tooltipBackground: '#80D134',
      tooltipText: '#FFFFFF',
    },
  };

  render() {
    const {
      width,
      height,
      margin,
      showTooltip,
      hideTooltip,
      tooltipData,
      tooltipTop,
      tooltipLeft,
      events,
      theme,
    } = this.props;

    const { stock } = this.state;

    if (width < 10) {
      return null;
    }

    // theme colors
    const themeColors = this.getThemeColors(theme);

    // bounds
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    // scales
    const xScale = scaleTime({
      range: [0, graphWidth],
      domain: extent(stock, xStock),
    });
    const yScale = scaleLinear({
      range: [graphHeight, 0],
      domain: [0, max(stock, yStock) + graphHeight / 3],
      // nice: true,
    });

    return (
      <div style={{ width: '100%', height: '100%', cursor: 'pointer' }} onClick={this.toggle}>
        <svg ref={s => (this.svg = s)} width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={themeColors.background}
            rx={14}
            ry={14}
          />

          <GridRows
            lineStyle={{ pointerEvents: 'none' }}
            scale={yScale}
            width={graphWidth}
            strokeDasharray="2,2"
            stroke="rgba(255, 255, 255, 0.3)"
          />
          <GridColumns
            lineStyle={{ pointerEvents: 'none' }}
            scale={xScale}
            width={graphHeight}
            strokeDasharray="2,2"
            stroke="rgba(255, 255, 255, 0.3)"
          />
          <Spring
            to={{ ys: stock.map(yStock) }}
            xScale={xScale}
            yScale={yScale}
            xs={stock.map(xStock)}
            themeColors={themeColors}
            children={Area}
          />
          <Bar
            x={0}
            y={0}
            width={width}
            height={height}
            fill="transparent"
            rx={14}
            ry={14}
            data={stock}
            onTouchStart={data => event =>
              this.handleTooltip({
                event,
                data,
                xStock,
                xScale,
                yScale,
              })}
            onTouchMove={data => event =>
              this.handleTooltip({
                event,
                data,
                xStock,
                xScale,
                yScale,
              })}
            onMouseMove={data => event =>
              this.handleTooltip({
                event,
                data,
                xStock,
                xScale,
                yScale,
              })}
            onMouseLeave={data => event => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: graphHeight }}
                stroke={themeColors.accent}
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
                strokeDasharray="2,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
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
          <div>
            <Tooltip
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={{
                backgroundColor: themeColors.tooltipBackground,
                color: themeColors.tooltipText,
              }}>
              {`$${yStock(tooltipData)}`}
            </Tooltip>
            <Tooltip
              top={graphHeight - 14}
              left={tooltipLeft}
              style={{
                transform: 'translateX(-50%)',
              }}>
              {formatDate(xStock(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    );
  }

  handleTooltip = ({ event, data, xStock, xScale, yScale }) => {
    const { showTooltip } = this.props;
    const { x } = localPoint(event);
    const x0 = xScale.invert(x);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - xStock(d0.date) > xStock(d1.date) - x0 ? d1 : d0;
    }
    showTooltip({
      tooltipData: d,
      tooltipLeft: x,
      tooltipTop: yScale(d.close),
    });
  };

  getThemeColors = theme => {
    if (typeof theme === 'string') {
      return AreaChart.themeColors[theme];
    }
    return theme;
  };

  toggle = () => {
    this.setState(({ offset }) => {
      const calcOffset = offset > 800 ? 0 : offset;

      const howMany = Math.floor(Math.random() * 50);

      return {
        offset: calcOffset + howMany,
        stock: appleStock.slice(calcOffset, calcOffset + howMany),
      };
    });
    console.log('changing data');
  };
}

export default withTooltip(AreaChart);
