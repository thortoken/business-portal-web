import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { withRouteModal } from '~components/Modal';
import CompanyDetails from './CompanyDetails';
import BeneficialOwners from './BeneficialOwners';
import CompanyTeam from './CompanyTeam';
import AddCompanyTeam from './CompanyTeam/AddCompanyTeam';
import LinkedAccounts from './LinkedAccounts';
import Integrations from './Integrations';
import Settings from './Settings';
import ManagementMenu from './components/ManagementMenu';
import AddCompanyDetails from './CompanyDetails/AddCompanyDetails';
import EditCompanyDetails from './CompanyDetails/EditCompanyDetails';
import AddBeneficialOwner from './BeneficialOwners/AddBeneficialOwner';
import IAVLinkedAccount from './LinkedAccounts/IAVLinkedAccount';
import VerifyLinkedAccounts from './LinkedAccounts/VerifyLinkedAccounts';
import RetryCompanyDetails from './CompanyDetails/RetryCompanyDetails';
import CompanyDocuments from './CompanyDetails/CompanyDocuments';
import AddCompanyDocument from './CompanyDetails/AddCompanyDocument';
import ChangeAdminPassword from './ChangeAdminPassword';
import Billing from './Billing';
import JobList from './JobList';
import AddJob from './JobList/AddJob';
import EditJob from './JobList/EditJob';
import Profile from './Profile';
import EditProfile from './Profile/EditProfile';
import DocumentList from './DocumentList';
import './Management.scss';

export class RootManagementPage extends React.Component {
  render() {
    return (
      <div className="ManagementPage">
        <ManagementMenu />
        <div className="ManagementPage__content">
          <Switch>
            <Route exact path={`/management/company-details`} component={CompanyDetails} />
            <Route
              exact
              path={`/management/company-details/documents`}
              component={CompanyDocuments}
            />
            <Route exact path={`/management/beneficial-owners`} component={BeneficialOwners} />
            <Route exact path={`/management/company-team`} component={CompanyTeam} />
            <Route exact path={`/management/billing`} component={Billing} />
            <Route exact path={`/management/linked-accounts`} component={LinkedAccounts} />
            <Route exact path={`/management/integrations`} component={Integrations} />
            <Route exact path={`/management/settings`} component={Settings} />
            <Route exact path={`/management/jobs`} component={JobList} />
            <Route exact path={`/management/profile`} component={Profile} />
            <Route exact path={`/management/documents`} component={DocumentList} />
            <Route
              exact
              path={`/management/jobs/add`}
              component={withRouteModal({
                component: AddJob,
                title: 'Add Job',
              })}
            />
            <Route
              exact
              path={`/management/jobs/:id/edit`}
              component={withRouteModal({
                component: EditJob,
                title: 'Edit Job',
              })}
            />
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
            />{' '}
            <Route
              exact
              path={`/management/change-admin-password`}
              component={withRouteModal({
                component: ChangeAdminPassword,
                title: 'Change Password',
              })}
            />
            <Route
              exact
              path={`/management/linked-accounts/add`}
              component={withRouteModal({
                component: IAVLinkedAccount,
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
            <Route
              exact
              path={`/management/profile/edit`}
              component={withRouteModal({ component: EditProfile, title: 'Edit Profile' })}
            />
            <Route
              exact
              path={`/management/company-team/add`}
              component={withRouteModal({ component: AddCompanyTeam, title: 'Add User' })}
            />
            <Route path={`/management`} component={CompanyDetails} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(RootManagementPage);
