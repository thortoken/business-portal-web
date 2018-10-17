import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, Button } from 'antd';
import { connect } from 'react-redux';

import Menu from './Menu/index';

import './Topbar.scss';

export class Topbar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    logout: PropTypes.func,
    type: PropTypes.string,
  };

  // handleLogout = async () => {
  //   const { logout, history } = this.props;
  //   console.log(this.props);
  //   await logout();
  //   history.push('/sign-in');
  // };

  render() {
    const { className, type, logout } = this.props;

    return (
      <div className={classNames('Topbar', className)}>
        <Menu type={type} />
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
