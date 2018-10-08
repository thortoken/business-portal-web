import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

export class Header extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    description: PropTypes.string,
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
    const { description, size, title, children } = this.props;
    const HeaderComponent = Header.headerSizes[size];

    return (
      <header className="Header">
        <HeaderComponent className="Header-title">
          {title}
          <div className="Header-title__right">{children}</div>
        </HeaderComponent>
        {description && <p className="Header-description">{description}</p>}
      </header>
    );
  }
}

export default Header;
