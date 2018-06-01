import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';

import { logout } from '~redux/actions/login';

import './Sidebar.css';

export class Sidebar extends React.Component {
  state = {
    collapsed: true,
  };

  render() {
    return (
      <div>
        <Layout.Sider
          className="Sidebar"
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          collapsed={this.state.collapsed}>
          <Menu theme="dark" mode="inline" selectedKeys={[this.props.pathname]}>
            <Menu.Item className="Sidebar-header">
              <img className="anticon" src="images/THOR-icon.png" />
              <span>Luber</span>
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
            <Menu.Item key="/contractors">
              <Link to="#">
                <Icon type="solution" />
                <span>Contractors</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/payments">
              <Link to="/payments">
                <Icon type="table" />
                <span>Payments</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/accounts">
              <Link to="#">
                <Icon type="setting" />
                <span>Connected Accounts</span>
              </Link>
            </Menu.Item>
            <Menu.Item className="Sidebar-item-logout">
              <a href="#" onClick={this.handleLogout}>
                <Icon type="logout" />
                <span>Logout</span>
              </a>
            </Menu.Item>
          </Menu>
          <div className="Sidebar-footer">
            <img src="images/Logo-white2x-p-500.png" />
          </div>
        </Layout.Sider>
      </div>
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
