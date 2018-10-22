import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from 'antd';
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';

import Menu from './Menu/index';

import Dropdown from '~components/Dropdown';

import './Topbar.scss';

const generateMenuItems = list => {
  return list.map(item => {
    return {
      key: item.route,
      value: (
        <Link to={item.route} key={item.route} onClick={item.function}>
          <Icon type={item.icon} theme="outlined" /> <span>{item.label}</span>
        </Link>
      ),
    };
  });
};

export class Topbar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    logout: PropTypes.func,
    type: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.generateMenuItems = generateMenuItems;
  }

  handleLogout = async () => {
    const { logout } = this.props;
    await logout();
  };

  render() {
    const { className, type } = this.props;
    const menuItems = [
      {
        route: '/management/company-details',
        label: 'Company Details',
        icon: 'home',
        function: () => {},
      },
      {
        route: '/management/beneficial-owners',
        label: 'Beneficial Owners',
        icon: 'crown',
        function: () => {},
      },
      {
        route: '/management/company-team',
        label: 'Company & Team',
        icon: 'user',
        function: () => {},
      },
      {
        route: '/management/linked-accounts',
        label: 'Linked Accounts',
        icon: 'bank',
        function: () => {},
      },
      {
        route: '/management/integrations',
        label: 'Integrations',
        icon: 'shrink',
        function: () => {},
      },
      { route: '/management/settings', label: 'Settings', icon: 'setting', function: () => {} },
      { route: '/', label: 'Logout', icon: 'logout', function: this.handleLogout },
    ];
    return (
      <div className={classNames('Topbar', className)}>
        <Menu type={type} />
        <div className="Topbar-right">
          <Dropdown
            className="ContractorDetails-options-btn"
            options={this.generateMenuItems(menuItems)}>
            <Icon type="setting" className="Topbar-icon" />
          </Dropdown>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: dispatch.auth.logout,
});

export default withRouter(connect(null, mapDispatchToProps)(Topbar));
