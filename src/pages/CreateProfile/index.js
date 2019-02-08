import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';
import { initialValues, formFields, validationSchema } from './formSchema';
import { handleFormHttpResponse } from '~utils/forms/errors';
import './CreateProfile.scss';

export class CreateProfile extends React.Component {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired,
  };

  state = {
    error: null,
  };

  render() {
    return (
      <div className="CreateProfile">
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
        <FormField key={name} name={name} label={options.label} {...options.input} />
      ))}

      {!this.props.disabled && (
        <div className="CreateProfile__button-container">
          <Button
            disabled={!dirty || isSubmitting}
            size="large"
            type="primary"
            loading={isSubmitting}
            htmlType="submit"
            className="CreateProfile__button-container--button">
            Create
          </Button>
        </div>
      )}
    </form>
  );

  handleSubmit = async (data, form) => {
    const { updateProfile } = this.props;
    let profileData = validationSchema.cast(data);
    try {
      await updateProfile(profileData);
      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = async () => {
    const { checkStatus, history } = this.props;
    const redirect = await checkStatus();
    if (redirect) {
      history.push(redirect);
    } else {
      history.push('/payments');
    }
  };
}

const mapStateToProps = state => ({
  isLoading: state.loading.effects.users.updateProfile,
});

const mapDispatchToProps = dispatch => ({
  updateProfile: dispatch.users.updateProfile,
  checkStatus: dispatch.welcome.checkStatus,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
