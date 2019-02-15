import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Select } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';
import { initialValues, formFields, validationSchema } from './formSchema';
import NotificationService from '~services/notification';
import { handleFormHttpResponse } from '~utils/forms/errors';
import SelectField from '~components/SelectField';
import './AddCompanyTeam.scss';

const Option = Select.Option;

const roles = [{ name: 'Admin', id: 'admin' }, { name: 'Readonly Admin', id: 'adminReader' }];

const generateRoleOptions = list => {
  return list.map(item => (
    <Option key={item.id} value={item.id}>
      {item.name}
    </Option>
  ));
};

export class AddCompanyTeam extends React.Component {
  static propTypes = {
    sendInvitation: PropTypes.func.isRequired,
  };

  state = {
    invitedAdmin: null,
    error: null,
  };

  render() {
    const { error } = this.state;

    return (
      <div className="AddCompanyTeam">
        <div className="AddCompanyTeam__errors">{error}</div>
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
      {Object.entries(formFields).map(([name, options]) => {
        if (name === 'role') {
          return (
            <FormField
              key={name}
              name={name}
              component={SelectField}
              dataSource={generateRoleOptions(roles)}
              onSelect={this.handleChange}
              label={options.label}
              {...options.input}
            />
          );
        } else {
          return <FormField key={name} name={name} label={options.label} {...options.input} />;
        }
      })}

      <div className="AddCompanyTeam__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="AddCompanyTeam__button-container--button">
          Invite
        </Button>
      </div>
    </form>
  );

  render;

  sendAdminInvitation = async data => {
    const { sendInvitation } = this.props;
    let { invitedAdmin } = this.state;

    if (!invitedAdmin) {
      invitedAdmin = await sendInvitation({ ...data, type: 'admin' });
      this.setState({ invitedAdmin });
    }
  };

  handleSubmit = async (data, form) => {
    try {
      await this.sendAdminInvitation(data);

      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    this.setState({ error: null });
    const { onSubmit, history } = this.props;
    if (typeof onSubmit === 'function') {
      const { invitedAdmin } = this.state;
      onSubmit(invitedAdmin);
    }
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Admin successfully invited.',
    });
    history.push(`/management/company-team`);
  };
}

const mapDispatch = ({ invitations: { sendInvitation } }) => ({
  sendInvitation,
});

export default connect(null, mapDispatch)(AddCompanyTeam);
