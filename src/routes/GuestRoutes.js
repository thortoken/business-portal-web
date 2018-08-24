import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import LandingPage from '~pages/LandingPage'
import Login from '~pages/Login'
import Register from '~pages/Register'
import UserInfo from '~pages/UserInfo'
import Status from '~pages/Status'

export class GuestRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/landing" component={LandingPage} />
        <Route exact path="/sign-in" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/userinfo" component={UserInfo} />
        <Route exact path="/status" component={Status} />
        <Redirect from="*" to="/sign-in" />
      </Switch>
    );
  }
}

export default GuestRoutes;
