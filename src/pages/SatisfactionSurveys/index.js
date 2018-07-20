import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Main from './pages/Main';
import CreateSurvey from './pages/CreateSurvey';

export class SatisfactionSurveys extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route path={`${match.path}/create/:templateId?`} component={CreateSurvey} />
        <Route path="" component={Main} />
      </Switch>
    );
  }
}

export default withRouter(SatisfactionSurveys);
