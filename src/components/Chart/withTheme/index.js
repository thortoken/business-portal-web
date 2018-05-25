import React from 'react';

const withTheme = ChartComponent => {
  const HOC = ({ theme, ...props }) => {
    const themeColors = typeof theme === 'string' ? themes[theme] : theme;
    return <ChartComponent themeColors={themeColors} {...props} />;
  };
  HOC.displayName = `withTheme(${ChartComponent.displayName || 'ChartComponent'})`;

  return HOC;
};

export const themes = {
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
export default withTheme;
