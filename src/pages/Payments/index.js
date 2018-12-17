import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import PaymentsConfirmation from './PaymentsConfirmation';
import PaymentsList from './PaymentsList';

import { withRouteModal } from '~components/Modal';
import AddCustomTransaction from '../Transactions/AddCustomTransaction';
import AddExistingTransaction from '../Transactions/AddExistingTransaction';

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
        <Route
          exact
          path={`/payments/:id/transactions/custom`}
          component={withRouteModal({
            component: AddCustomTransaction,
            title: 'With Custom Job',
          })}
        />
        <Route
          exact
          path={`/payments/:id/transactions/existing`}
          component={withRouteModal({
            component: AddExistingTransaction,
            title: 'With Existing Job',
          })}
        />
        <Route path={`${match.path}`} component={PaymentsList} />
      </Switch>
    );
  }
}

export default withRouter(RootPaymentsPage);
