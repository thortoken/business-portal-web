import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/Dashboard';
import Sidebar from '../components/Sidebar/index';

import './AuthorizedRoutes.css';

export default class AuthorizedRoutes extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div className="AuthorizedRoutes-page">
          <Switch>
            <Route exact path="/landing" component={LandingPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Redirect from="*" to="/dashboard" />
          </Switch>
        </div>
      </div>
    );
  }
}
