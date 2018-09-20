import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LandingPage from '~pages/LandingPage';
import Login from '~pages/Login';
import UserInfo from '~pages/UserInfo';
import Status from '~pages/Status';
import RegisterPage from '../pages/Register';

export class GuestRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/landing" component={LandingPage} />
        <Route exact path="/sign-in" component={Login} />
        <Route exact path="/userinfo" component={UserInfo} />
        <Route exact path="/status" component={Status} />
        <Route path="/register" component={RegisterPage} />
        <Redirect from="*" to="/sign-in" />
      </Switch>
    );
  }
}

export default GuestRoutes;
