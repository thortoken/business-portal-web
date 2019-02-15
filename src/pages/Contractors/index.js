import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import AddContractor from './AddContractor';
import ContractorDetails from './ContractorDetails';
import ContractorList from './ContractorList';
import EditContractor from './EditContractor';
import InvitationList from './InvitationList';
import InviteContractor from './InviteContractor';
import DocumentList from './DocumentList';
import AddDwollaDocument from './AddDwollaDocument';
import { withRouteModal } from '~components/Modal';
import FundingSourceList from './FundingSourceList';
import AddFundingSource from './FundingSourceList/AddFundingSource';
import VerifyFundingSource from './FundingSourceList/VerifyFundingSource';
import RetryContractor from './RetryContractor';
import UploadInviteContractor from './UploadInviteContractor';
import AddCustomTransaction from '../Transactions/AddCustomTransaction';
import AddExistingTransaction from '../Transactions/AddExistingTransaction';

export class RootContractorsPage extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.path}/invitations`} component={InvitationList} />
        <Route exact path={`${match.path}/:id/fundingSources`} component={FundingSourceList} />
        <Route exact path={`${match.path}/:id/documents`} component={DocumentList} />
        <Route
          exact
          path={`/contractors/:id/fundingSources/verify/:fsId`}
          component={withRouteModal({
            component: VerifyFundingSource,
            title: 'Verify Funding Source',
          })}
        />
        <Route
          exact
          path={`/contractors/:id/transactions/custom`}
          component={withRouteModal({
            component: AddCustomTransaction,
            title: 'With Custom Job',
          })}
        />
        <Route
          exact
          path={`/contractors/:id/transactions/existing`}
          component={withRouteModal({
            component: AddExistingTransaction,
            title: 'With Existing Job',
          })}
        />
        <Route
          exact
          path={`/contractors/invite/upload`}
          component={withRouteModal({
            component: UploadInviteContractor,
            title: 'Upload Invite CSV',
          })}
        />
        <Route
          exact
          path={`/contractors/:id/fundingSources/add`}
          component={withRouteModal({ component: AddFundingSource, title: 'Add Funding Source' })}
        />
        <Route
          exact
          path={`/contractors/:id/documents/dwolla`}
          component={withRouteModal({ component: AddDwollaDocument, title: 'Add Document' })}
        />
        <Route
          exact
          path={`${match.path}/add`}
          component={withRouteModal({ component: AddContractor, title: 'Add Contractor' })}
        />
        <Route
          exact
          path={`${match.path}/:id/retry`}
          component={withRouteModal({ component: RetryContractor, title: 'Retry Contractor' })}
        />
        <Route
          exact
          path={`${match.path}/invite`}
          component={withRouteModal({ component: InviteContractor, title: 'Invite Contractor' })}
        />
        <Route
          exact
          path={`${match.path}/:id/edit`}
          component={withRouteModal({ component: EditContractor, title: 'Edit Contractor' })}
        />
        <Route exact path={`${match.path}/:id`} component={ContractorDetails} />
        <Route path={`${match.path}`} component={ContractorList} />
      </Switch>
    );
  }
}

export default withRouter(RootContractorsPage);
