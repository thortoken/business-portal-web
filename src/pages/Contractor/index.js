import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { withRouteModal } from '~components/Modal';
import ContractorDetails from './ContractorDetails';
import EditContractor from './EditContractor';
import RetryContractor from './RetryContractor';
import DocumentList from './DocumentList';
import AddDwollaDocument from './AddDwollaDocument';
import FundingSourceList from './FundingSourceList';
import AddFundingSource from './FundingSourceList/AddFundingSource';
import VerifyFundingSource from './FundingSourceList/VerifyFundingSource';

export class RootContractorsPage extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.path}/:id/fundingSources`} component={FundingSourceList} />
        <Route exact path={`${match.path}/:id/documents`} component={DocumentList} />
        <Route
          exact
          path={`/contractors/fundingSources/verify/:fsId`}
          component={withRouteModal({
            component: VerifyFundingSource,
            title: 'Verify Funding Source',
          })}
        />
        <Route
          exact
          path={`/contractors/fundingSources/add`}
          component={withRouteModal({ component: AddFundingSource, title: 'Add Funding Source' })}
        />
        <Route
          exact
          path={`/contractors/documents/dwolla`}
          component={withRouteModal({ component: AddDwollaDocument, title: 'Add Document' })}
        />
        <Route
          exact
          path={`${match.path}/retry`}
          component={withRouteModal({ component: RetryContractor, title: 'Retry Contractor' })}
        />
        <Route
          exact
          path={`${match.path}/edit`}
          component={withRouteModal({ component: EditContractor, title: 'Edit Contractor' })}
        />
        <Route exact path={`${match.path}`} component={ContractorDetails} />
      </Switch>
    );
  }
}

export default withRouter(RootContractorsPage);
