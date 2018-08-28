import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';
import moment from 'moment';

import FormField from '~components/FormField';

import { initialValues, formFields, validationSchema } from './formSchema';
import './AddContractor.css';

export class AddContractor extends React.Component {
  static propTypes = {
    createFundingSource: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
  };

  state = {
    createdContractor: null,
    error: null,
  };

  createContractor = async profile => {
    const { createUser } = this.props;
    let { createdContractor } = this.state;

    if (!createdContractor) {
      profile.dateOfBirth = moment(profile.dateOfBirth).format('YYYY-MM-DD');
      createdContractor = await createUser({ profile });
      this.setState({ createdContractor });
    }
  };

  createFundingSource = async ({ accountNumber, routingNumber }) => {
    const { createFundingSource } = this.props;
    const { createdContractor } = this.state;

    await createFundingSource({
      id: createdContractor.id,
      data: {
        accountNumber,
        routingNumber,
      },
    });
  };

  handleSubmit = async (data, form) => {
    const { routingNumber, accountNumber, ...profile } = data;

    try {
      await this.createContractor(profile);
      await this.createFundingSource({ accountNumber, routingNumber });

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
  };

  render() {
    const { error } = this.state;

    return (
      <div className="Add-contractor">
        <div className="Add-contractor__errors">{error}</div>
        <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          validationSchema={validationSchema}>
          {({ handleSubmit, isSubmitting, values, dirty }) => (
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
                  Add {values.firstName}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapDispatch = ({ users: { create, createFundingSource } }) => ({
  createUser: create,
  createFundingSource,
});

export default connect(null, mapDispatch)(AddContractor);
