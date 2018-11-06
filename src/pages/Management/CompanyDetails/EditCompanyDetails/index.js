import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';
import classnames from 'classnames';
import _ from 'lodash';

import FormField from '~components/FormField';

import { formFields, validationSchema, initialValues } from './formSchema';
import './EditCompanyDetails.scss';
import NotificationService from '~services/notification';

import { handleFormHttpResponse } from '~utils/forms/errors';

export class EditCompanyDetails extends React.Component {
  static propTypes = {
    company: PropTypes.object,
    editTenantCompany: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  render() {
    const { company } = this.props;
    let formFields = company;
    if (formFields === null) {
      formFields = initialValues;
    }
    _.forIn(formFields, (value, key) => {
      if (value === '' || !value) {
        formFields[key] = '-';
      }
    });
    return (
      <div className="EditCompanyDetails">
        <Formik
          initialValues={formFields}
          onSubmit={this.handleSubmit}
          validationSchema={validationSchema}>
          {this.renderForm}
        </Formik>
      </div>
    );
  }

  renderForm = ({ handleSubmit, isSubmitting, values, dirty }) => (
    <form onSubmit={handleSubmit}>
      {Object.entries(formFields).map(([name, options]) => (
        <FormField
          key={name}
          name={name}
          label={options.label}
          disabled={this.props.disabled}
          {...options.input}
          placeholder={this.props.disabled ? '' : options.input.placeholder}
          className={classnames('EditCompanyDetails__input', {
            'EditCompanyDetails__input--disabled': this.props.disabled,
          })}
        />
      ))}

      {!this.props.disabled && (
        <div className="EditCompanyDetails__button-container">
          <Button
            disabled={!dirty || isSubmitting}
            size="large"
            type="primary"
            loading={isSubmitting}
            htmlType="submit"
            className="EditCompanyDetails__button-container--button">
            Save
          </Button>
        </div>
      )}
    </form>
  );

  handleSubmit = async (data, form) => {
    const { editTenantCompany } = this.props;
    try {
      await editTenantCompany(data);
      this.handleSubmitSuccess();
      form.setSubmitting(false);
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    const { history } = this.props;
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Company Details successfully edited.',
    });
    history.push(`/management/company-details`);
  };
}

const mapStateToProps = state => ({
  company: state.tenantCompany.company,
});

const mapDispatchToProps = dispatch => ({
  editTenantCompany: dispatch.tenantCompany.editTenantCompany,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyDetails);
