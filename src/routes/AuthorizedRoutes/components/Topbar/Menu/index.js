import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu as MenuAnt } from 'antd';
import { connect } from 'react-redux';

import { getSelectedKeyFromPath } from '../helper';

import './Menu.css';

export class Menu extends React.Component {
  static propTypes = {
    pathname: PropTypes.string,
  };

  render() {
    const { pathname } = this.props;

    const selectedKeys = [getSelectedKeyFromPath(pathname)];

    return (
      <MenuAnt theme="light" mode="horizontal" selectedKeys={selectedKeys} className="Menu">
        <MenuAnt.Item key="/welcome">
          <Link to="/welcome">
            <span>Overview</span>
          </Link>
        </MenuAnt.Item>
        <MenuAnt.Item key="/payments">
          <Link to="/payments">
            <span>Payments</span>
          </Link>
        </MenuAnt.Item>
      </MenuAnt>
    );
  }
}

const mapState = ({ router }) => ({ pathname: router.location.pathname });
export default connect(mapState)(Menu);
