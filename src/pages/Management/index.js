import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import CompanyDetails from './CompanyDetails';
import { BeneficialOwners } from './BeneficialOwners';
import { CompanyTeam } from './CompanyTeam';
import { LinkedAccounts } from './LinkedAccounts';
import { Integrations } from './Integrations';
import { Settings } from './Settings';
import { withRouteModal } from '~components/Modal';
import ManagementMenu from './_components/ManagementMenu';

import './Management.scss';
import AddCompanyDetails from './CompanyDetails/AddCompanyDetails';

export class RootManagementPage extends React.Component {
  render() {
    return (
      <div className="ManagementPage">
        <ManagementMenu />
        <div className="ManagementPage__content">
          <Switch>
            <Route exact path={`/management/company-details`} component={CompanyDetails} />
            <Route exact path={`/management/beneficial-owners`} component={BeneficialOwners} />
            <Route exact path={`/management/company-team`} component={CompanyTeam} />
            <Route exact path={`/management/linked-accounts`} component={LinkedAccounts} />
            <Route exact path={`/management/integrations`} component={Integrations} />
            <Route exact path={`/management/settings`} component={Settings} />

            <Route
              exact
              path={`/management/company-details/add`}
              component={withRouteModal({
                component: AddCompanyDetails,
                title: 'Add Company Details',
              })}
            />
            <Route path={`/management`} component={CompanyDetails} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(RootManagementPage);
