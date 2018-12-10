import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Intercom from 'react-intercom';

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
    const { token, roles, user } = this.props;

    if (token) {
      if (roles.includes('admin')) {
        const intercomUser = {
          user_id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        };
        return (
          <div>
            {intercomUser.name && <Intercom appID="v8y4n317" {...intercomUser} />}
            <AdminRoutes redirect={Config.savedRoot} />
          </div>
        );
      } else if (roles.includes('contractor')) {
        return <ContractorRoutes redirect={Config.savedRoot} />;
      }
    } else {
      return <GuestRoutes />;
    }
  }
}

const mapState = ({ auth: { token, roles, user } }) => ({ token, roles, user });

export default withRouter(connect(mapState)(RouteFactory));
