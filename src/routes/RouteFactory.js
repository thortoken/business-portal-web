import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AuthorizedRoutes from './AuthorizedRoutes';
import GuestRoutes from './GuestRoutes';

export class RouteFactory extends Component {
  render() {
    const { token } = this.props;

    return token ? <AuthorizedRoutes /> : <GuestRoutes />;
  }
}

const mapState = ({ auth: { token } }) => ({ token });

export default withRouter(connect(mapState)(RouteFactory));
