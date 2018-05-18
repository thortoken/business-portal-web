import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AuthorizedRoutes from './AuthorizedRoutes';
import GuestRoutes from './GuestRoutes';

export class RouteFactory extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return isLoggedIn ? <AuthorizedRoutes /> : <GuestRoutes />;
  }
}

const mapState = ({ login }) => ({
  isLoggedIn: login.loggedIn,
});

export default withRouter(connect(mapState)(RouteFactory));
