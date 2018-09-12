import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, Button } from 'antd';
import { connect } from 'react-redux';

import Menu from './Menu';

import './Topbar.css';

const Logo = ({ children }) => <div className="Topbar-logo">{children}</div>;

class Topbar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    logout: PropTypes.func,
  };

  render() {
    const { className, logout } = this.props;

    return (
      <div className={classNames('Topbar', className)}>
        <div className="Topbar-left">
          <Logo>
            <img className="Topbar-logo-image" src="images/yoshi_logo.png" />
          </Logo>
        </div>
        <div className="Topbar-center">
          <Menu />
        </div>
        <div className="Topbar-right">
          <Button type="primary" ghost onClick={logout}>
            <Icon type="logout" className="Topbar-icon" /> Logout
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatch = ({ auth: { logout } }) => ({ logout });

export default connect(null, mapDispatch)(Topbar);
