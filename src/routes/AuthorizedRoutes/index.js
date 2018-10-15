import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import PaymentsPage from '~pages/Payments';
import ContractorsPage from '~pages/Contractors';

import Topbar from './components/Topbar';

import './AuthorizedRoutes.css';

import { RouteGuard } from '../RouteGuard';

const Admin = RouteGuard(['admin']);
// const Contractor = RouteGuard(['admin', 'contractor']);

export class AuthorizedRoutes extends React.Component {
  render() {
    return (
      <Layout className="AuthorizedRoutes">
        <Topbar className="AuthorizedRoutes-nav" />
        <Layout.Content className="AuthorizedRoutes-content">
          <Switch>
            <Route path="/payments" component={Admin(PaymentsPage)} />
            <Route path="/contractors" component={Admin(ContractorsPage)} />
            <Redirect from="*" to="/payments" />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

export default AuthorizedRoutes;
