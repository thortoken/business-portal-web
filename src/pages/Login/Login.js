import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Button } from 'antd'
import FormField from '~components/FormField'

import './Login.css';

import { formFields, validationSchema, initialValues } from './formSchema'

class Login extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  render() {

    return (
      <div className="Login">
        <div className="Login__form-container">
          <h1 className="Login__title">Sign In</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                {Object.entries(formFields).map(([name, options]) => {
                  return (
                    <FormField key={name} name={name} label={options.label} {...options.input} className='Login__input-group-container'/>)
                })}

                <Button
                  className="Login__submit-btn"
                  type="submit"
                  htmlType="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  Sign in
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }

  handleSubmit = async (data, form) => {
    const { login } = this.props;
    const { email, password } = data;
    try {
      await login({ email, password });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log(err.response)
      }
      form.setSubmitting(false);
    }
  };
}

const mapDispatch = ({ auth: { login } }) => ({ login });

export default connect(
  null,
  mapDispatch
)(Login)
