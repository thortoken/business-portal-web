import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import { formFields, validationSchema, initialValues } from './formSchema';
import './VerifyLinkedAccounts.scss';
import NotificationService from '~services/notification';

import { handleFormHttpResponse } from '~utils/forms/errors';
import { traverseRecursively } from '~utils/iterators';

export class VerifyLinkedAccounts extends React.Component {
  static propTypes = {
    verifyFundingSourceAmount: PropTypes.func,
  };

  render() {
    return (
      <div className="VerifyLinkedAccounts">
        <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          validationSchema={validationSchema}>
          {this.renderForm}
        </Formik>
      </div>
    );
  }

  prepareForm(fields) {
    let formArray = [];
    traverseRecursively(fields, {
      childKey: 'fields',
      nodeCallback: () => console.log(),
      leafCallback: data => {
        const { value, path } = data;
        formArray.push(
          <FormField
            key={path.join('.')}
            name={path.join('.')}
            label={value.label}
            {...value.input}
          />
        );
      },
    });
    return [...formArray];
  }

  renderForm = ({ handleSubmit, isSubmitting, values, dirty }) => (
    <form onSubmit={handleSubmit}>
      {this.prepareForm(formFields)}

      <div className="VerifyLinkedAccounts__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="VerifyLinkedAccounts__button-container--button">
          Verify
        </Button>
      </div>
    </form>
  );

  handleSubmit = async (data, form) => {
    const { verifyFundingSourceAmount } = this.props;
    try {
      await verifyFundingSourceAmount(data);
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
      description: 'Linked Account successfully verified.',
    });
    history.push(`/management/linked-accounts`);
  };
}

const mapDispatchToProps = dispatch => ({
  verifyFundingSourceAmount: dispatch.fundingSources.verifyTenantFundingSourceAmount,
});

export default connect(null, mapDispatchToProps)(VerifyLinkedAccounts);
