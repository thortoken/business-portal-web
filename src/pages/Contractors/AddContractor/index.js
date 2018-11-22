import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import { initialValues, formFields, transformDateToMoment, validationSchema } from './formSchema';
import './AddContractor.scss';
import NotificationService from '~services/notification';

import { handleFormHttpResponse } from '~utils/forms/errors';

import { traverseRecursively } from '~utils/iterators';

export class AddContractor extends React.Component {
  static propTypes = {
    createFundingSource: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
  };

  state = {
    createdContractor: null,
    error: null,
  };

  prepareForm(fields) {
    let formArray = [];
    traverseRecursively(fields, {
      childKey: 'fields',
      nodeCallback: () => console.log(),
      leafCallback: data => {
        const { value, path } = data;
        formArray.push(
          <FormField
            key={path.join('.')}
            name={path.join('.')}
            label={value.label}
            {...value.input}
          />
        );
      },
    });
    return [...formArray];
  }

  render() {
    const { error } = this.state;

    return (
      <div className="Add-contractor">
        <div className="Add-contractor__errors">{error}</div>
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
      {this.prepareForm(formFields)}

      <div className="Add-contractor__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="Add-contractor__button-container--button">
          Add {values.firstName}
        </Button>
      </div>
    </form>
  );

  createContractor = async profile => {
    const { createUser } = this.props;
    let { createdContractor } = this.state;
    if (!createdContractor) {
      const data = {
        ...profile,
        postalCode: String(profile.postalCode),
        dateOfBirth: transformDateToMoment(profile.dateOfBirth).format('YYYY-MM-DD'),
      };
      createdContractor = await createUser({ profile: data });
      this.setState({ createdContractor });
    }
  };

  createFundingSource = async ({ account, routing }) => {
    const { createFundingSource } = this.props;
    const { createdContractor } = this.state;

    await createFundingSource({
      id: createdContractor.id,
      data: {
        account,
        routing,
      },
    });
  };

  handleSubmit = async (data, form) => {
    const { routing, account, profile } = data;
    try {
      let dataProfile = JSON.parse(JSON.stringify(profile));
      dataProfile.dateOfBirth = transformDateToMoment(dataProfile.dateOfBirth).format('YYYY-MM-DD');

      await this.createContractor(dataProfile);
      await this.createFundingSource({ account, routing });

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
      description: 'Contractor successfully added.',
    });
    history.push(`/contractors`);
  };
}

const mapDispatch = ({ users: { create, createFundingSource } }) => ({
  createUser: create,
  createFundingSource,
});

export default connect(null, mapDispatch)(AddContractor);
