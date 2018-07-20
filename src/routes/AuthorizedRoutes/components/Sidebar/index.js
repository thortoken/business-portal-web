import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import classnames from 'classnames';

import { logout } from '~redux/actions/login';

import './Sidebar.css';

export const getSelectedKeyFromPath = path => {
  if (!path) {
    return '';
  }

  const matches = path.match(/^(\/[^/]*)/);
  return matches ? matches[0] : '';
};

export class Sidebar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    logout: PropTypes.func,
    pathname: PropTypes.string,
  };

  render() {
    const { className, pathname } = this.props;

    const selectedKeys = [getSelectedKeyFromPath(pathname)];

    return (
      <Layout.Header className={classnames('Sidebar', className)}>
        <Menu theme="light" mode="horizontal" selectedKeys={selectedKeys}>
          <Menu.Item className="Sidebar-header">
            <div className="Sidebar-header-brand">
              <img className="anticon" src="images/THOR-icon.png" />
            </div>
          </Menu.Item>
          <Menu.Item key="/welcome">
            <Link to="/welcome">
              <Icon type="notification" />
              <span>Welcome!</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/dashboard">
            <Link to="/dashboard">
              <Icon type="home" />
              <span>Account Summary</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/payments">
            <Link to="/payments">
              <Icon type="table" />
              <span>Payments</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/satisfaction-surveys">
            <Link to="/satisfaction-surveys">
              <Icon type="smile" />
              <span>Satisfaction Surveys</span>
            </Link>
          </Menu.Item>
          <Menu.Item className="Sidebar-item-logout">
            <a href="#" onClick={this.handleLogout}>
              <Icon type="logout" />
              <span>Logout</span>
            </a>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }

  handleLogout = () => {
    this.props.logout();
  };
  handleMouseOver = () => {
    this.setState({ collapsed: false });
  };
  handleMouseOut = () => {
    this.setState({ collapsed: true });
  };
}

const mapState = ({ router }) => ({ pathname: router.location.pathname });
const mapDispatch = dispatch => bindActionCreators({ logout }, dispatch);
export default connect(mapState, mapDispatch)(Sidebar);
