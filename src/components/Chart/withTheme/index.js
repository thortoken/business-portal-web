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
    background: '#FFFFFF',
    lineColor: '#3988EA',
    text: '#989898',
    tooltipBackground: '#3988EA',
    tooltipText: '#FFFFFF',
  },
  green: {
    accent: '#80D134',
    areaBackground: '#B2E29E',
    background: '#FFFFFF',
    lineColor: '#80D134',
    text: '#989898',
    tooltipBackground: '#80D134',
    tooltipText: '#FFFFFF',
  },
};
export default withTheme;
