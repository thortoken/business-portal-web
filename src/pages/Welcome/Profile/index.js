import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';
import classnames from 'classnames';

import FormField from '~components/FormField';
import { initialValues, formFields, validationSchema } from './formSchema';
import { handleFormHttpResponse } from '~utils/forms/errors';
import './Profile.scss';

export class Profile extends React.Component {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  state = {
    error: null,
  };

  render() {
    return (
      <div className="EditProfile">
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
            Next
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

  handleSubmitSuccess = () => {
    const { changeStep } = this.props;
    changeStep(2);
  };
}

const mapStateToProps = state => ({
  isLoading: state.loading.effects.users.updateProfile,
});

const mapDispatchToProps = dispatch => ({
  updateProfile: dispatch.users.updateProfile,
  changeStep: dispatch.onBoarding.changeStep,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
