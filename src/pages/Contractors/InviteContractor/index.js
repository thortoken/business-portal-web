import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import { initialValues, formFields, validationSchema } from './formSchema';
import './InviteContractor.scss';
import NotificationService from '../../../services/notification';

export class InviteContractor extends React.Component {
  static propTypes = {
    sendInvitation: PropTypes.func.isRequired,
  };

  state = {
    invitedContractor: null,
    error: null,
  };

  render() {
    const { error } = this.state;

    return (
      <div className="InviteContractor">
        <div className="InviteContractor__errors">{error}</div>
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

      <div className="InviteContractor__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="InviteContractor__button-container--button">
          Invite
        </Button>
      </div>
    </form>
  );

  inviteContractor = async data => {
    const { sendInvitation } = this.props;
    let { invitedContractor } = this.state;

    if (!invitedContractor) {
      invitedContractor = await sendInvitation(data);
      this.setState({ invitedContractor });
    }
  };

  handleSubmit = async (data, form) => {
    try {
      await this.inviteContractor(data);

      this.handleSubmitSuccess();
    } catch (err) {
      if (err.response) {
        this.setState({ error: err.response.data.error });
      }
      form.setSubmitting(false);
    }
  };

  handleSubmitSuccess = () => {
    this.setState({ error: null });
    const { onSubmit, history } = this.props;
    if (typeof onSubmit === 'function') {
      const { invitedContractor } = this.state;
      onSubmit(invitedContractor);
    }
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Contractor successfully invited.',
    });
    history.push(`/contractors/invitationsList`);
  };
}

const mapDispatch = ({ invitations: { sendInvitation } }) => ({
  sendInvitation,
});

export default connect(null, mapDispatch)(InviteContractor);
