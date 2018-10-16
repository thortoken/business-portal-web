import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';
import ContractorRoutes from './ContractorRoutes';
import GuestRoutes from './GuestRoutes';

export class RouteFactory extends Component {
  render() {
    const { token, roles } = this.props;
    if (token) {
      if (roles.includes('admin')) {
        return <AdminRoutes />;
      } else if (roles.includes('contractor')) {
        return <ContractorRoutes />;
      }
    } else {
      return <GuestRoutes />;
    }
  }
}

const mapState = ({ auth: { token, roles } }) => ({ token, roles });

export default withRouter(connect(mapState)(RouteFactory));
