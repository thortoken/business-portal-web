import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import { initialValues, formFields, transformDateToMoment, validationSchema } from './formSchema';
import './SignUp.scss';

import { handleFormHttpResponse } from '~utils/forms/errors';

export class SignUp extends React.Component {
  static propTypes = {
    contractor: PropTypes.object,
    invToken: PropTypes.string,
  };

  state = {
    createdContractor: null,
    error: null,
  };

  render() {
    const { error } = this.state;
    const { contractor } = this.props;
    initialValues.email = contractor.email;
    return (
      <div className="SignUp">
        <div className="SignUp__form">
          <div className="SignUp__errors">{error}</div>
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
          Sign Up
        </Button>
      </div>
    </form>
  );

  create = async data => {
    const { createContractor } = this.props;

    data.profile.postalCode = String(data.profile.postalCode);
    data.profile.dateOfBirth = transformDateToMoment(data.profile.dateOfBirth).format('YYYY-MM-DD');
    await createContractor(data);
  };

  handleSubmit = async (data, form) => {
    const { invToken } = this.props;
    const normalizedData = validationSchema.cast(data);
    normalizedData['country'] = 'USA';
    const { ...profile } = normalizedData;

    const contractor = {
      profile: {
        ...normalizedData,
      },
      invitationToken: invToken,
      password: profile.password,
    };

    try {
      await this.create(contractor);

      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    const { changeStep } = this.props;
    changeStep(2);
  };
}

const mapStateToProps = state => ({
  contractor: state.onBoarding.contractor,
  isLoading: state.loading.effects.onBoarding.create,
});

const mapDispatchToProps = dispatch => ({
  createContractor: dispatch.onBoarding.create,
  changeStep: dispatch.onBoarding.changeStep,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
