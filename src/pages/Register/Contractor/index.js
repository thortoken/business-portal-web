import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import { initialValues, formFields, transformDateToMoment, validationSchema } from './formSchema';
import './Contractor.css';

export class Contractor extends React.Component {
  static propTypes = {
    createUser: PropTypes.func.isRequired,
  };

  state = {
    createdContractor: null,
    error: null,
  };

  render() {
    const { error } = this.state;

    return (
      <div className="Contractor">
        <div className="Contractor__form">
          <div className="Contractor__title">Create Contractor</div>
          <div className="Contractor__errors">{error}</div>
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
        <FormField key={name} name={name} label={options.label} {...options.input} />
      ))}

      <div className="Add-contractor__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="Add-contractor__button-container--button">
          Register
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

  handleSubmit = async (data, form) => {
    const normalizedData = validationSchema.cast(data);
    const tenantId = '7bc0447a-ea99-4ba2-93bb-c84f5b325c50';
    const { ...profile } = normalizedData;

    try {
      await this.createContractor({ ...profile, tenantId });

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

    const { onSubmit } = this.props;
    if (typeof onSubmit === 'function') {
      const { createdContractor } = this.state;
      onSubmit(createdContractor);
    }

    this.props.history.push('/register/bank');
  };
}

const mapDispatch = ({ users: { create } }) => ({
  createUser: create,
});

export default connect(null, mapDispatch)(Contractor);
