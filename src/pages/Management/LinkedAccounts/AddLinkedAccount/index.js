import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import { formFields, validationSchema, initialValues } from './formSchema';
import './AddLinkedAccount.scss';
import NotificationService from '~services/notification';

import { handleFormHttpResponse } from '~utils/forms/errors';
import { traverseRecursively } from '~utils/iterators';

export class AddLinkedAccount extends React.Component {
  static propTypes = {
    addFundingSource: PropTypes.func,
  };

  render() {
    return (
      <div className="AddLinkedAccount">
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

      <div className="AddLinkedAccount__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="AddLinkedAccount__button-container--button">
          Add
        </Button>
      </div>
    </form>
  );

  handleSubmit = async (data, form) => {
    const { addFundingSource } = this.props;
    data.bankAccountType = 'checking';
    try {
      await addFundingSource(data);
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
  addFundingSource: dispatch.linkedAccounts.addFundingSource,
});

export default connect(null, mapDispatchToProps)(AddLinkedAccount);
