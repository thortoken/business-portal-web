import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ContractorPage from '~pages/Contractor';
import OnBoarding from '~pages/OnBoarding';
import { Contractor } from '../RouteGuard';
import RouteLayout from '../RouteLayout';
import './ContractorRoutes.scss';

export class ContractorRoutes extends React.Component {
  render() {
    let redirect = this.props.redirect;
    if (redirect === '/sign-in' || redirect === '/') {
      redirect = '/contractor';
    }
    const routeClass = 'AdminRoutes-content';
    return (
      <Switch>
        <Route
          exact
          path="/contractor"
          component={Contractor(RouteLayout(routeClass, 'contractor')(ContractorPage))}
        />
        <Route exact path="/on-boarding" component={OnBoarding} />
        <Redirect from="*" to="/contractor" />
      </Switch>
    );
  }
}

export default ContractorRoutes;
