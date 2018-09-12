import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu as MenuAnt } from 'antd';
import { connect } from 'react-redux';

import { getSelectedKeyFromPath } from '../helper';

import './Menu.css';

const menuItems = [
  { route: '/payments', label: 'Payments' },
  { route: '/contractors', label: 'Contractors' },
];

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
  };

  constructor(props) {
    super(props);

    this.menuItems = menuItems;
    this.generateMenuItems = generateMenuItems;
  }

  render() {
    const { pathname } = this.props;

    const selectedKeys = [getSelectedKeyFromPath(pathname)];

    return (
      <MenuAnt theme="light" mode="horizontal" selectedKeys={selectedKeys} className="Menu">
        {this.generateMenuItems(menuItems)}
      </MenuAnt>
    );
  }
}

const mapState = ({ router }) => ({ pathname: router.location.pathname });
export default connect(mapState)(Menu);
