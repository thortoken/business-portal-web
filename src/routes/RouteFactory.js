import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AuthorizedRoutes from './AuthorizedRoutes';
import GuestRoutes from './GuestRoutes';

export class RouteFactory extends Component {
  render() {
    const { token, roles } = this.props;

    return token && roles ? <AuthorizedRoutes /> : <GuestRoutes />;
  }
}

const mapState = ({ auth: { token, roles } }) => ({ token, roles });

export default withRouter(connect(mapState)(RouteFactory));
