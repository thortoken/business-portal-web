import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import Status from '../pages/Status';
import UserInfo from '../pages/UserInfo';
import Dashboard from '../pages/Dashboard';

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
