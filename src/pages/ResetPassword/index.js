import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';
import classNames from 'classnames';

import FormField from '~components/FormField';
import { initialValues, formFields, validationSchema } from './formSchema';
import './ResetPassword.scss';
import NotificationService from '../../services/notification';
import { handleFormHttpResponse } from '~utils/forms/errors';

export class ResetPassword extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        resetToken: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    resetPassword: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    const { checkResetToken, match, history } = this.props;
    const isTokenValid = await checkResetToken({ resetToken: match.params.resetToken });

    // TODO: don't redirect, just display a message
    if (!isTokenValid) {
      NotificationService.open({
        type: 'error',
        message: 'Error',
        description: `Invalid reset token`,
      });
      history.push('/sign-in');
    }
  }

  render() {
    return (
      <div className="ResetPassword">
        <div className="ResetPassword__container">
          <div className="ResetPassword__msg">Enter your new password and press reset</div>
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

      <div className="ResetPassword__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="ResetPassword__button-container--button">
          Reset
        </Button>
      </div>
    </form>
  );

  changePassword = async data => {
    const { resetPassword } = this.props;

    await resetPassword(data);
  };

  handleSubmit = async (data, form) => {
    try {
      const { resetToken } = this.props.match.params;
      await this.props.resetPassword({
        resetToken,
        newPassword: data.newPassword,
      });

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
      description: 'Password successfully reset.',
    });
    history.push('/sign-in');
  };
}

const mapDispatchToProps = dispatch => ({
  resetPassword: dispatch.auth.resetPassword,
  checkResetToken: dispatch.auth.checkResetToken,
});

export default connect(null, mapDispatchToProps)(ResetPassword);
