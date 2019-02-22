import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddFundingSource from '~components/AddFundingSource';
import { handleFormHttpResponse } from '~utils/forms/errors';
import './FundingSource.scss';

export class FundingSource extends React.Component {
  static propTypes = {
    createFundingSource: PropTypes.func.isRequired,
    changeStep: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
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
    this.props.checkStep();
  };
}

const mapStateToProps = state => ({
  isLoading: state.loading.effects.fundingSources.createTenantContractorFundingSource,
});

const mapDispatchToProps = dispatch => ({
  createFundingSource: dispatch.fundingSources.createTenantContractorFundingSource,
  checkStep: dispatch.welcome.checkStep,
});

export default connect(mapStateToProps, mapDispatchToProps)(FundingSource);
