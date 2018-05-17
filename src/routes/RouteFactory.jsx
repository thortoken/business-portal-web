import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';

import LandingPage from '../pages/landingPage';
import Register from '../pages/register';
import SignIn from '../pages/signIn';
import Status from '../pages/status';
import UserInfo from '../pages/userInfo';
import Dashboard from '../pages/dashboard';

export class RouteFactory extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return isLoggedIn ? (
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Redirect from="*" to="/dashboard" />
      </Switch>
    ) : (
      <Switch>
        <Route exact path="/landing" component={LandingPage} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/userinfo" component={UserInfo} />
        <Route exact path="/status" component={Status} />
        <Redirect from="*" to="/sign-in" />
      </Switch>
    );
  }
}

const mapState = ({ login }) => ({
  isLoggedIn: login.loggedIn,
});

export default withRouter(connect(mapState)(RouteFactory));
