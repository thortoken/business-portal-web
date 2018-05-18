import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../redux/actions/login';

import Link from '../LinkWithIcon';

import './Sidebar.css';

export class Sidebar extends React.Component {
  render() {
    return (
      <div className="Sidebar">
        <div className="Sidebar-header">
          <Link linkTo="/">
            <Link.Icon src="images/THOR-icon.png" />
            <Link.Label>Luber</Link.Label>
          </Link>
        </div>
        <div className="Sidebar-nav">
          <Link linkTo="/landing">
            <Link.Icon src="images/FB_footericon.png" />
            <Link.Label>Landing Page</Link.Label>
          </Link>
          <Link linkTo="/dashboard">
            <Link.Icon src="images/FB_footericon.png" />
            <Link.Label>Dashboard</Link.Label>
          </Link>
          <Link onClick={this.handleLogout} className="Sidebar-nav-logout">
            <Link.Icon src="images/GitHub_socialicon.png" />
            <Link.Label>Logout</Link.Label>
          </Link>
        </div>
        <div className="Sidebar-footer">
          <img src="images/Logo-white2x-p-500.png" width="100" />
        </div>
      </div>
    );
  }

  handleLogout = () => {
    this.props.logout();
  };
}

const mapDispatch = dispatch => bindActionCreators({ logout }, dispatch);
export default connect(null, mapDispatch)(Sidebar);
