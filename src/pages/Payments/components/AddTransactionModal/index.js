import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import { Formik } from 'formik';

import FormField from '~components/FormField';
import './AddTransaction.css';

import { initialValues, formFields, validationSchema } from './formSchema';

export { validationSchema } from './formSchema';

export class AddTransactionModal extends Component {
  state = {
    createdTransaction: null,
    isValid: false,
  };

  render() {
    const { onSave, onCancel, errorMsg } = this.props;

    return (
      <Modal
        title="Add transaction"
        visible={this.props.isModalVisible}
        footer={null}
        onCancel={onCancel}
        destroyOnClose>
        <div className="AddTransaction_error-message">{errorMsg}</div>
        <Formik initialValues={initialValues} onSubmit={onSave} validationSchema={validationSchema}>
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
