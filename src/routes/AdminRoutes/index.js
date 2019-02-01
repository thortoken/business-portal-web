import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import WelcomePage from '~pages/Welcome';
import PaymentsPage from '~pages/Payments';
import ContractorsPage from '~pages/Contractors';
import RootManagementPage from '~pages/Management';
import { Admin } from '../RouteGuard';
import RouteLayout from '../RouteLayout';
import './AdminRoutes.scss';

export class AdminRoutes extends React.Component {
  static propTypes = {
    redirent: PropTypes.string,
    user: PropTypes.object,
    tenant: PropTypes.object,
  };

  async componentDidMount() {
    const { user, tenant, history, getTenant } = this.props;
    if (!tenant.status) {
      const { status } = await getTenant();
      if (status !== 'active') {
        history.push('/welcome');
      }
    } else if (user.status !== 'active' || tenant.status !== 'active') {
      if (tenant.status) {
        history.push('/welcome');
      }
    }
  }

  render() {
    let redirect = this.props.redirect;
    if (redirect === '/sign-in' || redirect === '/') {
      redirect = '/payments';
    }
    const path = window.location.pathname;
    const routeClass = path.includes('/management/')
      ? 'SidebarRoutes-content'
      : 'AdminRoutes-content';
    return (
      <Switch>
        <Route path="/payments" component={Admin(RouteLayout(routeClass, 'admin')(PaymentsPage))} />
        <Route
          path="/contractors"
          component={Admin(RouteLayout(routeClass, 'admin')(ContractorsPage))}
        />
        <Route
          path="/management"
          component={Admin(RouteLayout(routeClass, 'admin')(RootManagementPage))}
        />
        <Route path="/welcome" component={Admin(WelcomePage)} />
        <Redirect from="*" to={redirect} />
      </Switch>
    );
  }
}

const mapStateToProps = ({ auth: { user }, tenants: { tenant } }, ownProps) => ({
  user,
  tenant,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  getTenant: dispatch.tenants.getTenant,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminRoutes));
