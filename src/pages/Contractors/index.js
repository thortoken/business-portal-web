import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import AddContractor from './AddContractor';
import ContractorDetails from './ContractorDetails';
import ContractorsList from './ContractorsList';
import EditContractor from './EditContractor';

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
          component={withRouteModal({ component: EditContractor, title: 'Edit Contractor' })}
        />
        <Route exact path={`${match.path}/:id`} component={ContractorDetails} />
        <Route path={`${match.path}`} component={ContractorsList} />
      </Switch>
    );
  }
}

export default withRouter(RootContractorsPage);
