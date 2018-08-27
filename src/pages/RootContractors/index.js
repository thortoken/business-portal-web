import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import AddContractor from './AddContractor';
import Contractors from './Contractors';
import Contractor from './Contractor';

import { withRouteModal } from '~components/Modal';

export class RootContractorsPage extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route
          exact
          path={`${match.path}/add`}
          component={withRouteModal({ component: AddContractor, title: 'Add Contractor' })}
        />
        <Route
          exact
          path={`${match.path}/:id/edit`}
          component={withRouteModal({ component: AddContractor, title: 'Edit Contractor' })}
        />
        <Route exact path={`${match.path}/:id`} component={Contractor} />
        <Route path={`${match.path}`} component={Contractors} />
      </Switch>
    );
  }
}

export default withRouter(RootContractorsPage);
