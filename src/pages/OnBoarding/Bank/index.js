import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import { initialValues, formFields, validationSchema } from './formSchema';
import './Bank.scss';

export class Bank extends React.Component {
  static propTypes = {
    createFundingSourceData: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="Bank">
        <div className="Bank__form">
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
          Add Bank Account
        </Button>
      </div>
    </form>
  );

  handleSubmit = async (data, form) => {
    const normalizedData = validationSchema.cast(data);
    const { createFundingSourceData } = this.props;

    await createFundingSourceData(normalizedData);
    this.handleSubmitSuccess();
  };

  handleSubmitSuccess = () => {
    const { changeStep } = this.props;
    changeStep(3);
  };
}

const mapDispatchToProps = dispatch => ({
  createFundingSourceData: dispatch.onBoarding.createFundingSourceData,
  changeStep: dispatch.onBoarding.changeStep,
});

export default connect(null, mapDispatchToProps)(Bank);
