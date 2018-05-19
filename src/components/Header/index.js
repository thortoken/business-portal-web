import React from 'react';

import './Header.css';

const Left = ({ children }) => <div className="Header-left">{children}</div>;
const Right = ({ children }) => <div className="Header-right">{children}</div>;

export default class Header extends React.Component {
  static Left = Left;
  static Right = Right;

  static defaultProps = {
    size: 'medium',
  };

  static headerSizes = {
    big: 'h1',
    medium: 'h2',
    small: 'h3',
  };

  render() {
    const { children } = this.props;
    return (
      <header className="Header">
        {this.renderHeader()}
        {children}
      </header>
    );
  }

  renderHeader() {
    const { size, title } = this.props;
    const HeaderComponent = Header.headerSizes[size];

    return <HeaderComponent className="Header-title">{title}</HeaderComponent>;
  }
}
