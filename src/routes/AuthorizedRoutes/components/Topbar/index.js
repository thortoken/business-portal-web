import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Menu from './Menu';
import ManageAccount from './ManageAccount';

import './Topbar.css';

const Logo = ({ children }) => <div className="Topbar-logo">{children}</div>;

class Topbar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { className } = this.props;

    return (
      <div className={classNames('Topbar', className)}>
        <div className="Topbar-left">
          <Logo>
            <img className="Topbar-logo-svg" src="images/logo.svg" />
            <img className="Topbar-logo-image" src="images/logoText.png" />
          </Logo>
        </div>
        <div className="Topbar-center">
          <Menu />
        </div>
        <div className="Topbar-right">
          <ManageAccount />
        </div>
      </div>
    );
  }
}

export default Topbar;
