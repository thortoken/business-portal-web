import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import PaymentsPage from '~pages/Payments';
import ContractorsPage from '~pages/Contractors';
import RootManagementPage from '~pages/Management';
import Topbar from '~components/Topbar';

import { Admin } from '../RouteGuard';

import './AdminRoutes.scss';

export class AdminRoutes extends React.Component {
  render() {
    return (
      <Layout className="AdminRoutes">
        <Topbar className="AdminRoutes-nav" type="admin" />
        <Layout.Content className="AdminRoutes-content">
          <Switch>
            <Route path="/payments" component={Admin(PaymentsPage)} />
            <Route path="/contractors" component={Admin(ContractorsPage)} />
            <Route path="/management" component={Admin(RootManagementPage)} />
            <Redirect from="*" to="/payments" />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

export default AdminRoutes;
