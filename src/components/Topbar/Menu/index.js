/* eslint-disable no-debugger */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu as MenuAnt } from 'antd';
import { connect } from 'react-redux';

import { getSelectedKeyFromPath } from '../helper';

import './Menu.scss';

const menuItems = [
  { route: '/payments', label: 'Payments' },
  { route: '/contractors', label: 'Contractors' },
];

const Logo = ({ children }) => <div className="Topbar-logo">{children}</div>;

export const generateMenuItems = list => {
  return list.map(item => (
    <MenuAnt.Item key={item.route} className="Menu__item">
      <Link to={item.route} className="Menu__link">
        <span>{item.label}</span>
      </Link>
    </MenuAnt.Item>
  ));
};

export class Menu extends React.Component {
  static propTypes = {
    pathname: PropTypes.string,
    type: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.menuItems = menuItems;
    this.generateMenuItems = generateMenuItems;
  }

  render() {
    const { pathname, type } = this.props;

    const selectedKeys = [getSelectedKeyFromPath(pathname)];

    return (
      <div className="Topbar-center">
        <MenuAnt theme="light" mode="horizontal" selectedKeys={selectedKeys} className="Menu">
          <MenuAnt.Item
            key={'/dashboard'}
            id="Menu__dashboard"
            className="Menu__item  Menu__dashboard">
            <Link to={'/dashboard'} className="Menu__link--logo">
              <Logo>
                <img className="Topbar-logo-svg" src="images/logo.svg" alt="" />
                <img className="Topbar-logo-image" src="images/logoText.png" alt="" />
              </Logo>
            </Link>
          </MenuAnt.Item>
          {type === 'admin' && this.generateMenuItems(menuItems)}
        </MenuAnt>
      </div>
    );
  }
}

const mapState = ({ router }) => ({ pathname: router.location.pathname });
export default connect(mapState)(Menu);
