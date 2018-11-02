import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import { formFields, validationSchema, initialValues } from './formSchema';
import './AddBeneficialOwner.scss';
import NotificationService from '~services/notification';

import { handleFormHttpResponse } from '~utils/forms/errors';
import { traverseRecursively } from '~utils/iterators';

export class AddBeneficialOwner extends React.Component {
  static propTypes = {
    createBeneficialOwner: PropTypes.func,
  };

  render() {
    return (
      <div className="AddBeneficialOwner">
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

      <div className="AddBeneficialOwner__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="AddBeneficialOwner__button-container--button">
          Add {values.firstName}
        </Button>
      </div>
    </form>
  );

  handleSubmit = async (data, form) => {
    const { createBeneficialOwner } = this.props;
    data.address.country = 'US';
    try {
      await createBeneficialOwner(data);
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
      description: 'Beneficial Owner successfully added.',
    });
    history.push(`/management/beneficial-owners`);
  };
}

const mapDispatchToProps = dispatch => ({
  createBeneficialOwner: dispatch.beneficialOwners.createBeneficialOwner,
});

export default connect(null, mapDispatchToProps)(AddBeneficialOwner);
