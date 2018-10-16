import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Button } from 'antd';

import Dropdown from '~components/Dropdown';

import './ManageAccount.css';

export const generateMenuItems = list => {
  return list.map(element => {
    const hasKey = element.hasOwnProperty('key') && element.key;
    const hasAction = element.hasOwnProperty('action') && element.action;

    if (!hasAction && !hasKey) {
      return null;
    }

    let Component = hasKey ? Link : 'div';
    let componentProps = hasKey ? { to: element.key } : { onClick: element.action };

    return {
      key: element.key,
      value: (
        <Component {...componentProps}>
          <Icon type={element.icon} /> <span>{element.label}</span>
        </Component>
      ),
      className: element.className || '',
    };
  });
};

export class ManageAccount extends React.Component {
  static propTypes = {
    logout: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.generateMenuItems = generateMenuItems;
  }

  render() {
    const menuList = [
      {
        key: '/add-team-member',
        icon: 'plus',
        label: 'Add Team Memebers',
        className: 'ManageAccount-list-item',
      },
      {
        key: '/add-invite-contractors',
        icon: 'user',
        label: 'Add / Invite Contractors',
        className: 'ManageAccount-list-item',
      },
      {
        key: '/bank-account',
        icon: 'bank',
        label: 'Bank Account',
        className: 'ManageAccount-list-item',
      },
      {
        key: '',
        icon: 'logout',
        label: 'Log Out',
        action: this.handleLogout,
        className: 'ManageAccount-list-item ManageAccount-logout',
      },
    ];

    return (
      <div className="ManageAccount">
        <Dropdown
          menuClassName="ManageAccount-menu"
          className="ManageAccount-btn"
          options={this.generateMenuItems(menuList)}
          onClick={this.handleTransactionsPeriodChange}>
          <Button type="primary" ghost>
            <Icon type="setting" className="ManageAccount-icon" /> Manage Account
          </Button>
        </Dropdown>
      </div>
    );
  }

  handleLogout = () => {
    const { logout } = this.props;
    logout();
  };
}

const mapDispatch = ({ auth: { logout } }) => ({ logout });

export default connect(null, mapDispatch)(ManageAccount);
