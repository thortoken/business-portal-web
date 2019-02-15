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
import withRouteModal from '~components/Modal/withRouteModal';
import CreateProfile from '~pages/CreateProfile';
import './AdminRoutes.scss';

export class AdminRoutes extends React.Component {
  static propTypes = {
    redirect: PropTypes.string,
  };

  async componentDidMount() {
    await this.handleCheckStatus();
  }

  handleCheckStatus = async () => {
    const { checkStatus, history } = this.props;
    const redirect = await checkStatus();
    if (redirect) {
      history.push(redirect);
    }
  };

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
        <Route
          path="/create-profile"
          component={Admin(
            withRouteModal({
              onClose: async () => {
                await this.handleCheckStatus();
              },
              component: CreateProfile,
              title: 'Create Profile',
            })
          )}
        />
        <Route path="/welcome" component={Admin(WelcomePage)} />
        <Redirect from="*" to={redirect} />
      </Switch>
    );
  }
}

const mapStateToProps = (_, ownProps) => ({
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  checkStatus: dispatch.welcome.checkStatus,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminRoutes));
