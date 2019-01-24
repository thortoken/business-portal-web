import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';
import { initialValues, formFields, validationSchema } from './formSchema';
import { handleFormHttpResponse } from '~utils/forms/errors';
import NotificationService from '../../services/notification';
import './Register.scss';

export class Register extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        invitationId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    user: PropTypes.object,
    checkInvitation: PropTypes.func,
    register: PropTypes.func,
  };

  state = {};

  async componentDidMount() {
    const { checkInvitation, match, history } = this.props;

    const redirect = await checkInvitation(match.params.invitationId);
    if (redirect) {
      history.push('/sign-in');
    }
  }

  render() {
    const { user } = this.props;
    initialValues.email = user && user.email;
    return (
      <div className="Register">
        <div className="Register__form-container">
          <img className="Register__image-top" src="images/loginImage.png" alt="" />
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}>
            {this.renderForm}
          </Formik>
          <div className="Register__image-container">
            <img className="Register__image-bottom" src="images/poweredBy.png" alt="" />
          </div>
        </div>
      </div>
    );
  }

  renderForm = ({ handleSubmit, isSubmitting, values, dirty }) => (
    <form onSubmit={handleSubmit}>
      {Object.entries(formFields).map(([name, options]) => {
        return (
          <FormField
            key={name}
            name={name}
            label={options.label}
            {...options.input}
            className="Register__input-group-container"
          />
        );
      })}

      <Button
        disabled={!dirty || isSubmitting}
        size="large"
        type="primary"
        loading={isSubmitting}
        htmlType="submit"
        className="Register__submit-btn">
        Register
      </Button>
    </form>
  );

  handleSubmit = async (data, form) => {
    const { match, register } = this.props;
    const validData = validationSchema.cast(data);

    const user = {
      invitationToken: match.params.invitationId,
      email: validData.email,
      password: validData.password,
    };
    const dataProfile = JSON.parse(JSON.stringify(user));

    try {
      await register(dataProfile);

      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Registration successful!',
    });
  };
}

const mapStateToProps = state => ({
  user: state.invitations.invitedUser,
  isLoading: state.loading.effects.auth.register,
});

const mapDispatchToProps = dispatch => ({
  checkInvitation: dispatch.invitations.checkInvitation,
  register: dispatch.auth.register,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
