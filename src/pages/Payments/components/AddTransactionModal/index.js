import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import FormField from '~components/FormField';
import './AddTransaction.css';

import { initialValues, formFields, validationSchema } from './formSchema';

export class AddTransactionModal extends Component {
  static propTypes = {
    createTransaction: PropTypes.func,
    onChangeVisibility: PropTypes.func,
    handleRefresh: PropTypes.func,
    userId: PropTypes.string,
  };
  state = {
    createdTransaction: null,
    isValid: false,
    errorMsg: '',
  };

  handleModalSave = async (transaction, form) => {
    const { createTransaction, userId, onChangeVisibility, handleRefresh } = this.props;
    const data = {
      ...validationSchema.cast(transaction),
      userId,
    };

    try {
      await createTransaction(data);
      onChangeVisibility(false, true);
      handleRefresh();
    } catch (err) {
      if (err.response) {
        this.setState({ errorMsg: err.response.data.error });
      }
      form.setSubmitting(false);
    }
  };

  handleModalCancel = () => {
    const { onChangeVisibility } = this.props;
    onChangeVisibility(false);
    this.setState({ errorMsg: '' });
  };

  render() {
    const { errorMsg } = this.state;

    return (
      <Modal
        title="Add transaction"
        visible={this.props.isModalVisible}
        footer={null}
        onCancel={this.handleModalCancel}
        destroyOnClose>
        <div className="AddTransaction_error-message">{errorMsg}</div>
        <Formik
          initialValues={initialValues}
          onSubmit={this.handleModalSave}
          validationSchema={validationSchema}>
          {this.renderForm}
        </Formik>
      </Modal>
    );
  }

  renderForm = ({ handleSubmit, isSubmitting, values, dirty, isValid }) => {
    return (
      <form onSubmit={handleSubmit}>
        {Object.entries(formFields).map(([name, options]) => (
          <FormField
            key={name}
            name={name}
            label={options.label}
            {...options.input}
            className="AddTransaction_half"
          />
        ))}

        <div className="AddTransaction_button">
          <Button disabled={!isValid} type="primary" loading={isSubmitting} htmlType="submit">
            Add transaction
          </Button>
        </div>
      </form>
    );
  };
}

export default AddTransactionModal;
