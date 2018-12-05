import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import { initialValues, formFields, validationSchema } from './formSchema';
import './ChangeAdminPassword.scss';
import NotificationService from '../../../services/notification';
import { handleFormHttpResponse } from '~utils/forms/errors';

import classNames from 'classnames';

export class ChangeAdminPassword extends React.Component {
  static propTypes = {
    changeAdminPassword: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="ChangeAdminPassword">
        <Formik
          initialValues={initialValues}
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
          {...options.input}
          className={classNames('', {
            'InputGroup--wide': options.input.wide,
          })}
        />
      ))}

      <div className="ChangeAdminPassword__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="ChangeAdminPassword__button-container--button">
          Save
        </Button>
      </div>
    </form>
  );

  changePassword = async data => {
    const { changeAdminPassword } = this.props;

    await changeAdminPassword(data);
  };

  handleSubmit = async (data, form) => {
    try {
      await this.changePassword(data);

      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    this.setState({ error: null });

    const { onSubmit, history } = this.props;
    if (typeof onSubmit === 'function') {
      const { createdContractor } = this.state;
      onSubmit(createdContractor);
    }
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Password successfully changed.',
    });
    history.goBack();
  };
}

const mapDispatchToProps = dispatch => ({
  changeAdminPassword: dispatch.tenants.changeAdminPassword,
});

export default connect(null, mapDispatchToProps)(ChangeAdminPassword);
