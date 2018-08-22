import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Contractors from './Contractors';
import Contractor from './Contractor';

export class RootContractorsPage extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route path={`${match.path}/:id`} component={Contractor} />
        <Route path="" component={Contractors} />
      </Switch>
    );
  }
}

export default withRouter(RootContractorsPage);
