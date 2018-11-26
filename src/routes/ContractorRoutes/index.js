import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import ContractorPage from '~pages/Contractor';
import OnBoarding from '~pages/OnBoarding';
import Topbar from '~components/Topbar';

import { Contractor } from '../RouteGuard';

import './ContractorRoutes.scss';

export class ContractorRoutes extends React.Component {
  render() {
    let redirect = this.props.redirect;
    if (redirect === '/sign-in' || redirect === '/') {
      redirect = '/contractor';
    }
    return (
      <Layout className="ContractorRoutes">
        <Topbar className="ContractorRoutes-nav" type="contractor" />
        <Layout.Content className="ContractorRoutes-content">
          <Switch>
            <Route exact path="/contractor" component={Contractor(ContractorPage)} />
            <Route exact path="/on-boarding/:invitationId" component={OnBoarding} />
            <Redirect from="*" to="/contractor" />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

export default ContractorRoutes;
