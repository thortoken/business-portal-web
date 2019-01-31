import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';
import classnames from 'classnames';
import _ from 'lodash';

import FormField from '~components/FormField';
import { initialValues, formFields, validationSchema } from './formSchema';
import NotificationService from '~services/notification';
import { handleFormHttpResponse } from '~utils/forms/errors';
import './EditProfile.scss';

export class EditProfile extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    updateProfile: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  state = {
    error: null,
  };

  render() {
    const { user } = this.props;
    let formFields = user;
    if (formFields === null) {
      formFields = initialValues;
    }
    _.forIn(formFields, (value, key) => {
      if (value === '' || !value) {
        delete formFields[key];
      }
    });
    return (
      <div className="EditProfile">
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
    const { history } = this.props;
    this.setState({ error: null });

    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Profile successfully updated.',
    });
    history.push(`/management/profile`);
  };
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = ({ users: { updateProfile } }) => ({
  updateProfile,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
