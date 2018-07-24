import React from 'react';

const withTheme = ChartComponent => {
  const HOC = ({ theme, themeColors, ...props }) => {
    let colors = null;
    if (typeof themeColors === 'object') {
      colors = themeColors;
    } else if (typeof theme === 'string') {
      colors = themes.hasOwnProperty(theme) ? themes[theme] : themes.green;
    } else if (typeof theme === 'object') {
      colors = theme;
    }
    return <ChartComponent themeColors={colors} {...props} />;
  };
  HOC.displayName = `withTheme(${ChartComponent.displayName || 'ChartComponent'})`;

  return HOC;
};

export const themes = {
  blue: {
    accent: '#3988EA',
    areaBackground: '#ABCEF2',
    background: 'transparent',
    gridColor: '#9B9B9B',
    lineColor: '#3988EA',
    text: '#9B9B9B',
    tooltipBackground: '#3988EA',
    tooltipText: '#FFFFFF',
  },
  green: {
    accent: '#80D134',
    areaBackground: '#B2E29E',
    background: 'transparent',
    gridColor: '#9B9B9B',
    lineColor: '#80D134',
    text: '#9B9B9B',
    tooltipBackground: '#80D134',
    tooltipText: '#FFFFFF',
  },
};
export default withTheme;
