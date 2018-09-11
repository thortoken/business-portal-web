import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import PaymentsConfirmation from './PaymentsConfirmation';
import PaymentsList from './PaymentsList';

import { withRouteModal } from '~components/Modal';

export class RootPaymentsPage extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route
          exact
          path={`${match.path}/confirmation`}
          component={withRouteModal({
            component: PaymentsConfirmation,
            title: 'Payments Confirmation',
          })}
        />
        <Route path={`${match.path}`} component={PaymentsList} />
      </Switch>
    );
  }
}

export default withRouter(RootPaymentsPage);
