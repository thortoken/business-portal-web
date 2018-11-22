import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import AddContractor from './AddContractor';
import ContractorDetails from './ContractorDetails';
import ContractorsList from './ContractorsList';
import EditContractor from './EditContractor';
import InvitationsList from './InvitationsList';
import InviteContractor from './InviteContractor';
import ContractorFundingSources from './ContractorFundingSources';
import ContractorDocuments from './ContractorDocuments';
import AddContractorDocument from './AddContractorDocument';

import { withRouteModal } from '~components/Modal';
import AddFundingSource from './ContractorFundingSources/AddFundingSource';
import RetryContractor from './RetryContractor';
import VerifyFundingSource from './ContractorFundingSources/VerifyFundingSource';
import UploadInviteContractor from './UploadInviteContractor';

export class RootContractorsPage extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.path}/invitationsList`} component={InvitationsList} />
        <Route
          exact
          path={`${match.path}/:id/fundingSources`}
          component={ContractorFundingSources}
        />
        <Route exact path={`${match.path}/:id/documents`} component={ContractorDocuments} />
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
          path={`/contractors/:id/documents/add`}
          component={withRouteModal({ component: AddContractorDocument, title: 'Add Document' })}
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
        <Route path={`${match.path}`} component={ContractorsList} />
      </Switch>
    );
  }
}

export default withRouter(RootContractorsPage);
