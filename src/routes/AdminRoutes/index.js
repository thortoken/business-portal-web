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
    let redirect = this.props.redirect;
    if (redirect === '/sign-in' || redirect === '/') {
      redirect = '/payments';
    }
    const path = window.location.pathname;
    const routeClass = path.includes('/management/')
      ? 'SidebarRoutes-content'
      : 'AdminRoutes-content';
    return (
      <Layout className="AdminRoutes">
        <Topbar className="AdminRoutes-nav" type="admin" />
        <Layout.Content className={routeClass}>
          <Switch>
            <Route path="/payments" component={Admin(PaymentsPage)} />
            <Route path="/contractors" component={Admin(ContractorsPage)} />
            <Route path="/management" component={Admin(RootManagementPage)} />
            <Redirect from="*" to={redirect} />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

export default AdminRoutes;
