import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddFundingSource from '~components/AddFundingSource';
import NotificationService from '~services/notification';
import { handleFormHttpResponse } from '~utils/forms/errors';
import './AddLinkedAccount.scss';

export class AddLinkedAccount extends React.Component {
  static propTypes = {
    createFundingSource: PropTypes.func.isRequired,
  };

  render() {
    return <AddFundingSource onSubmit={this.handleSubmit} />;
  }

  handleSubmit = async (data, form) => {
    const { createFundingSource } = this.props;
    data.bankAccountType = 'checking';
    try {
      await createFundingSource(data);
      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    const { history } = this.props;
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Linked Account successfully added.',
    });
    history.push(`/management/linked-accounts`);
  };
}

const mapDispatchToProps = dispatch => ({
  createFundingSource: dispatch.fundingSources.createTenantFundingSource,
});

export default connect(null, mapDispatchToProps)(AddLinkedAccount);
