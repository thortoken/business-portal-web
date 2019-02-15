import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import ContractorPage from '~pages/Contractor';
import OnBoarding from '~pages/OnBoarding';
import { Contractor } from '../RouteGuard';
import RouteLayout from '../RouteLayout';
import './ContractorRoutes.scss';

export class ContractorRoutes extends React.Component {
  async componentDidMount() {
    const { currentUser, history } = this.props;
    if (currentUser.status !== 'active') {
      history.push('/on-boarding');
    }
  }

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

const mapStateToProps = ({ auth: { user } }, ownProps) => ({
  currentUser: user,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractorRoutes));
