import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

export class Header extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    title: PropTypes.string,
  };

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

export default Header;
