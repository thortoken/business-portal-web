import React from 'react';
import { shallow } from 'enzyme';

import { ChartCard } from './index';

const fakeThemeColors = {
  accent: '#ffffff',
  chartColor: '#ff0000',
  text: '#000000',
};

const initChartCard = overrides => {
  return shallow(<ChartCard themeColors={fakeThemeColors} {...overrides} />);
};

describe('component: <ChartCard/>', () => {
  it('should render without crashing', () => {
    const wrapper = initChartCard();
    expect(wrapper).toBeTruthy();
  });

  it('should use theme colors', () => {
    const wrapper = initChartCard();
    expect(wrapper.find('.ChartCard-title').prop('style').color).toBe(fakeThemeColors.text);
    expect(wrapper.find('.ChartCard-aggregated-value').prop('style').color).toBe(
      fakeThemeColors.accent
    );
    expect(wrapper.find('Icon').prop('style').color).toBe(fakeThemeColors.accent);
  });

  it('should render title and aggregated value', () => {
    const wrapper = initChartCard({
      aggregatedValue: '$123,456.78',
      title: 'Revenue',
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass themeColors and all other props to the chart', () => {
    const chartProps = {
      other1: 'value1',
      other2: 'value2',
    };
    const wrapper = initChartCard(chartProps);
    const chart = wrapper.find('.ChartCard-chart').childAt(0);
    expect(chart.props()).toMatchObject({
      ...chartProps,
      themeColors: fakeThemeColors,
    });
  });
});
