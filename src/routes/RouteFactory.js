import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';
import ContractorRoutes from './ContractorRoutes';
import GuestRoutes from './GuestRoutes';
import Config from '~services/config';

export class RouteFactory extends Component {
  constructor(props) {
    super(props);
    Config.savedRoot = window.location.pathname;
  }

  render() {
    const { token, roles } = this.props;
    if (token) {
      if (roles.includes('admin')) {
        return <AdminRoutes redirect={Config.savedRoot} />;
      } else if (roles.includes('contractor')) {
        return <ContractorRoutes redirect={Config.savedRoot} />;
      }
    } else {
      return <GuestRoutes />;
    }
  }
}

const mapState = ({ auth: { token, roles } }) => ({ token, roles });

export default withRouter(connect(mapState)(RouteFactory));
