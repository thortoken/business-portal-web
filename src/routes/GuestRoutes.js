import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '~pages/Login';
import RegisterPage from '../pages/Register';

export class GuestRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/sign-in" component={Login} />
        <Route path="/register" component={RegisterPage} />
        <Redirect from="*" to="/sign-in" />
      </Switch>
    );
  }
}

export default GuestRoutes;
