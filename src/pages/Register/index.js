import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Welcome from './Welcome';
import Contractor from './Contractor';
import Bank from './Bank';
import Thanks from './Thanks';

export class RegisterPage extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.path}/thanks`} component={Thanks} />
        <Route exact path={`${match.path}/contractor`} component={Contractor} />
        <Route exact path={`${match.path}/bank`} component={Bank} />
        <Route path={`${match.path}`} component={Welcome} />
      </Switch>
    );
  }
}

export default withRouter(RegisterPage);
