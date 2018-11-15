import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import CompanyDetails from './CompanyDetails';
import BeneficialOwners from './BeneficialOwners';
import { CompanyTeam } from './CompanyTeam';
import LinkedAccounts from './LinkedAccounts';
import { Integrations } from './Integrations';
import { Settings } from './Settings';
import { withRouteModal } from '~components/Modal';
import ManagementMenu from './_components/ManagementMenu';

import './Management.scss';
import AddCompanyDetails from './CompanyDetails/AddCompanyDetails';
import EditCompanyDetails from './CompanyDetails/EditCompanyDetails';
import AddBeneficialOwner from './BeneficialOwners/AddBeneficialOwner';
import AddLinkedAccount from './LinkedAccounts/AddLinkedAccount';
import VerifyLinkedAccounts from './LinkedAccounts/VerifyLinkedAccounts';
import RetryCompanyDetails from './CompanyDetails/RetryCompanyDetails';
import CompanyDocuments from './CompanyDetails/CompanyDocuments';
import AddCompanyDocument from './CompanyDetails/AddCompanyDocument';

export class RootManagementPage extends React.Component {
  render() {
    return (
      <div className="ManagementPage">
        <ManagementMenu />
        <div className="ManagementPage__content">
          <Switch>
            <Route exact path={`/management/company-details`} component={CompanyDetails} />
            <Route exact path={`/management/company-details/documents`} component={CompanyDocuments} />
            <Route exact path={`/management/beneficial-owners`} component={BeneficialOwners} />
            <Route exact path={`/management/company-team`} component={CompanyTeam} />
            <Route exact path={`/management/linked-accounts`} component={LinkedAccounts} />
            <Route exact path={`/management/integrations`} component={Integrations} />
            <Route exact path={`/management/settings`} component={Settings} />
            <Route
              exact
              path={`/management/linked-accounts/verify`}
              component={withRouteModal({
                component: VerifyLinkedAccounts,
                title: 'Verify Linked Account',
              })}
            />
            <Route
              exact
              path={`/management/company-details/documents/add`}
              component={withRouteModal({
                component: AddCompanyDocument,
                title: 'Add Document',
              })}
            />
            <Route
              exact
              path={`/management/linked-accounts/add`}
              component={withRouteModal({
                component: AddLinkedAccount,
                title: 'Add Linked Account',
              })}
            />
            <Route
              exact
              path={`/management/company-details/add`}
              component={withRouteModal({
                component: AddCompanyDetails,
                title: 'Add Company Details',
              })}
            />
            <Route
              exact
              path={`/management/company-details/retry`}
              component={withRouteModal({
                component: RetryCompanyDetails,
                title: 'Resend Company Details',
              })}
            />
            <Route
              exact
              path={`/management/company-details/edit`}
              component={withRouteModal({
                component: EditCompanyDetails,
                title: 'Edit Company Details',
              })}
            />
            <Route
              exact
              path={`/management/beneficial-owners/add`}
              component={withRouteModal({
                component: AddBeneficialOwner,
                title: 'Add Beneficial Owner',
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
