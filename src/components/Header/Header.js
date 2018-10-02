import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';
import RefreshButton from '../RefreshButton';

export class Header extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    description: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    title: PropTypes.string,
    handleRefresh: PropTypes.func,
    refresh: PropTypes.bool.isRequired,
    refreshLoading: PropTypes.bool,
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
    const {
      description,
      size,
      title,
      children,
      refresh,
      handleRefresh,
      refreshLoading,
    } = this.props;
    const HeaderComponent = Header.headerSizes[size];

    return (
      <header className="Header">
        <HeaderComponent className="Header-title">
          {title}
          {refresh && (
            <div className="Header-title__refresh">
              <RefreshButton handleRefresh={handleRefresh} isLoading={refreshLoading} />
            </div>
          )}
        </HeaderComponent>
        {children}
        {description && <p className="Header-description">{description}</p>}
      </header>
    );
  }
}

export default Header;
