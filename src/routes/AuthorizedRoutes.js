import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import LandingPage from '~pages/LandingPage';
import Dashboard from '~pages/Dashboard';

import Sidebar from '~components/Sidebar/index';

import './AuthorizedRoutes.css';

export default class AuthorizedRoutes extends React.Component {
  render() {
    return (
      <Layout className="AuthorizedRoutes">
        <Sidebar />
        <Layout.Content>
          <Switch>
            <Route exact path="/landing" component={LandingPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Redirect from="*" to="/dashboard" />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}
