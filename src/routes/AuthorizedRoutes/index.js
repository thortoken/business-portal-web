import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import OverviewPage from '~pages/Overview';
import LandingPage from '~pages/LandingPage';
import DashboardPage from '~pages/Dashboard';
import PaymentsPage from '~pages/Payments';
import SatisfactionSurveysPage from '~pages/SatisfactionSurveys';
import ContractorsPage from '~pages/Contractors';

import Topbar from './components/Topbar';

import './AuthorizedRoutes.css';

export class AuthorizedRoutes extends React.Component {
  render() {
    return (
      <Layout className="AuthorizedRoutes">
        <Topbar className="AuthorizedRoutes-nav" />
        <Layout.Content className="AuthorizedRoutes-content">
          <Switch>
            <Route exact path="/welcome" component={OverviewPage} />
            <Route exact path="/landing" component={LandingPage} />
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route exact path="/payments" component={PaymentsPage} />
            <Route path="/contractors" component={ContractorsPage} />
            <Route path="/satisfaction-surveys" component={SatisfactionSurveysPage} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

export default AuthorizedRoutes;
