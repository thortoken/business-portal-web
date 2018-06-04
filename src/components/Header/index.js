import React from 'react';

import './Header.css';

export default class Header extends React.Component {
  static defaultProps = {
    size: 'medium',
  };

  static headerSizes = {
    large: 'h1',
    medium: 'h2',
    small: 'h3',
  };

  render() {
    const { size, title, children } = this.props;
    const HeaderComponent = Header.headerSizes[size];

    return (
      <header className="Header">
        <HeaderComponent className="Header-title">{title}</HeaderComponent>
        {children}
      </header>
    );
  }
}
