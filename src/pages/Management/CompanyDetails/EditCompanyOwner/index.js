import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';
import classnames from 'classnames';

import FormField from '~components/FormField';

import { formFields, validationSchema } from './formSchema';
import './EditCompanyOwner.scss';
import NotificationService from '../../../../services/notification';

import { handleFormHttpResponse } from '~utils/forms/errors';
import { traverseRecursively } from '~utils/iterators';

export class EditCompanyOwner extends React.Component {
  static propTypes = {
    owner: PropTypes.object,
    editCompanyOwner: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  render() {
    const { owner } = this.props;
    return (
      <div className="EditCompanyOwner">
        <Formik
          initialValues={owner}
          onSubmit={this.handleSubmit}
          validationSchema={validationSchema}>
          {this.renderForm}
        </Formik>
      </div>
    );
  }

  prepareForm(fields) {
    const { disabled } = this.props;
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
            disabled={disabled}
            {...value.input}
            placeholder={disabled ? '' : value.input.placeholder}
            className={classnames('EditCompanyOwner__input', {
              'EditCompanyOwner__input--disabled': disabled,
            })}
          />
        );
      },
    });
    return [...formArray];
  }

  renderForm = ({ handleSubmit, isSubmitting, values, dirty }) => (
    <form onSubmit={handleSubmit}>
      {this.prepareForm(formFields)}

      {!this.props.disabled && (
        <div className="EditCompanyOwner__button-container">
          <Button
            disabled={!dirty || isSubmitting}
            size="large"
            type="primary"
            loading={isSubmitting}
            htmlType="submit"
            className="EditCompanyOwner__button-container--button">
            Save
          </Button>
        </div>
      )}
    </form>
  );

  handleSubmit = async (data, form) => {
    const { editTenantCompany } = this.props;
    const normalizedData = validationSchema.cast(data);
    try {
      await editTenantCompany(normalizedData);
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
      description: 'Company Owner successfully edited.',
    });
    history.push(`/management/company-details`);
  };
}

const mapStateToProps = state => ({
  owner: state.tenantCompany.owner,
});

const mapDispatchToProps = dispatch => ({
  editCompanyOwner: dispatch.tenantCompany.editCompanyOwner,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyOwner);
