import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import { Formik } from 'formik';

import FormField from '~components/FormField';
import './AddFundingSourceModal.css';

import { initialValues, formFields, validationSchema } from './formSchema';

export class AddFundingSourceModal extends Component {
  state = {
    createdTransaction: null,
    isValid: false,
    errorMsg: '',
  };

  handleModalSave = async (formData, form) => {
    const { createFundingSource, userId, onChangeVisibility } = this.props;
    const data = {
      data: {
        ...validationSchema.cast(formData),
      },
      id: userId,
    };

    console.log(data);

    try {
      await createFundingSource(data);
      onChangeVisibility(false, true);
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
        title="Add funding source"
        visible={this.props.isModalVisible}
        footer={null}
        onCancel={this.handleModalCancel}
        destroyOnClose>
        <div className="AddFundingSource_error-message">{errorMsg}</div>
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
            className="AddFundingSource_fullWidth"
          />
        ))}

        <div className="AddFundingSource_button">
          <Button disabled={!isValid} type="primary" loading={isSubmitting} htmlType="submit">
            Add
          </Button>
        </div>
      </form>
    );
  };
}

export default AddFundingSourceModal;
