import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button } from 'antd';
import FormField from '~components/FormField';

import './Login.css';

import { formFields, validationSchema, initialValues } from './formSchema';
import NotificationService from '../../services/notification';

export class Login extends React.Component {
  static propTypes = {
    login: PropTypes.func,
  };

  renderForm = ({ handleSubmit, isSubmitting, dirty }) => (
    <form onSubmit={handleSubmit}>
      {Object.entries(formFields).map(([name, options]) => {
        return (
          <FormField
            key={name}
            name={name}
            label={options.label}
            {...options.input}
            className="Login__input-group-container"
          />
        );
      })}

      <Button
        className="Login__submit-btn"
        type="submit"
        htmlType="submit"
        disabled={!dirty || isSubmitting}
        loading={isSubmitting}>
        Sign in
      </Button>
    </form>
  );

  render() {
    return (
      <div className="Login">
        <div className="Login__form-container">
          <img className="Login__image-top" src="images/loginImage.png" alt="" />
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}>
            {this.renderForm}
          </Formik>
          <div className="Login__image-container">
            <img className="Login__image-bottom" src="images/poweredBy.png" alt="" />
          </div>
        </div>
      </div>
    );
  }

  checkLogin = async data => {
    const { login, location } = this.props;
    const tenant = new window.URLSearchParams(location.search).get('tenant');
    const { email, password } = data;
    await login({ email, password, tenant });
  };

  handleSubmit = async (data, form) => {
    try {
      await this.checkLogin(data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        NotificationService.open({
          type: 'error',
          message: err.response.data.error,
          description: 'Try again.',
        });
      }
      form.setSubmitting(false);
    }
  };
}

const mapDispatch = ({ auth: { login } }) => ({ login });

export default connect(null, mapDispatch)(Login);
