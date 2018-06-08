import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import WelcomePage from '~pages/Welcome';
import LandingPage from '~pages/LandingPage';
import DashboardPage from '~pages/Dashboard';
import PaymentsPage from '~pages/Payments';

import Sidebar from './components/Sidebar';

import './AuthorizedRoutes.css';

export class AuthorizedRoutes extends React.Component {
  render() {
    return (
      <Layout className="AuthorizedRoutes">
        <Sidebar />
        <Layout.Content className="AuthorizedRoutes-content">
          <Switch>
            <Route exact path="/welcome" component={WelcomePage} />
            <Route exact path="/landing" component={LandingPage} />
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route exact path="/payments" component={PaymentsPage} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

export default AuthorizedRoutes;
