import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '~pages/Login';
import OnBoarding from '~pages/OnBoarding';
import ResetPassword from '~pages/ResetPassword';

export class GuestRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/sign-in" component={Login} />
        <Route exact path="/on-boarding/:invitationId" component={OnBoarding} />
        <Route exact path="/reset-password/:resetToken" component={ResetPassword} />
        <Redirect from="*" to="/sign-in" />
      </Switch>
    );
  }
}

export default GuestRoutes;
