import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, Button } from 'antd';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import Menu from './Menu/index';

import './Topbar.scss';

export class Topbar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    logout: PropTypes.func,
    type: PropTypes.string,
  };

  handleLogout = async () => {
    const { logout, history } = this.props;
    await logout();
    history.push('/');
  };

  render() {
    const { className, type } = this.props;

    return (
      <div className={classNames('Topbar', className)}>
        <Menu type={type} />
        <div className="Topbar-right">
          <Button type="primary" ghost onClick={this.handleLogout}>
            <Icon type="logout" className="Topbar-icon" /> Logout
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: dispatch.auth.logout,
});

export default withRouter(connect(null, mapDispatchToProps)(Topbar));
