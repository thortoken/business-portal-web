import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';
import { handleFormHttpResponse } from '~utils/forms/errors';

import { initialValues, formFields, validationSchema } from './formSchema';
import './Bank.scss';

export class Bank extends React.Component {
  static propTypes = {
    createFundingSource: PropTypes.func.isRequired,
  };

  state = {
    error: null,
  };

  render() {
    const { error } = this.state;

    return (
      <div className="Contractor">
        <div className="Contractor__form">
          <div className="Contractor__title">Add Funding Source</div>
          <div className="Contractor__errors">{error}</div>
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}>
            {this.renderForm}
          </Formik>
        </div>
      </div>
    );
  }

  renderForm = ({ handleSubmit, isSubmitting, values, dirty }) => (
    <form onSubmit={handleSubmit}>
      {Object.entries(formFields).map(([name, options]) => (
        <FormField key={name} name={name} label={options.label} {...options.input} />
      ))}

      <div className="Add-contractor__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="Add-contractor__button-container--button">
          Connect Funding Source
        </Button>
      </div>
    </form>
  );

  createFundingSource = async ({ accountNumber, routingNumber }) => {
    const { createFundingSource, contractor, token } = this.props;
    let authToken = token;
    if (contractor) {
      authToken = contractor.token;
    }

    await createFundingSource(
      {
        accountNumber,
        routingNumber,
      },
      authToken
    );
  };

  handleSubmit = async (data, form) => {
    const normalizedData = validationSchema.cast(data);
    const { routingNumber, accountNumber } = normalizedData;

    try {
      await this.createFundingSource({ accountNumber, routingNumber });

      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    this.setState({ error: null });

    const { onSubmit } = this.props;
    if (typeof onSubmit === 'function') {
      const { lastCreatedContractor } = this.props;
      onSubmit(lastCreatedContractor);
    }
  };
}

const mapStateToProps = state => ({
  contractor: state.onBoarding.contractor,
  token: state.auth.token,
  isLoading: state.loading.effects.onBoarding.create,
});

const mapDispatchToProps = dispatch => ({
  createFundingSource: dispatch.onBoarding.createFundingSource,
  changeStep: dispatch.onBoarding.changeStep,
});

export default connect(mapStateToProps, mapDispatchToProps)(Bank);
