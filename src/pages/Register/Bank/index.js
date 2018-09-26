import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import { initialValues, formFields, validationSchema } from './formSchema';
import './Bank.css';

export class Bank extends React.Component {
  static propTypes = {
    createFundingSourceDemo: PropTypes.func.isRequired,
  };

  state = {
    error: null,
  };

  render() {
    const { error } = this.state;

    return (
      <div className="Contractor">
        <div className="Contractor__form">
          <div className="Contractor__title">Add Founding Source</div>
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
          Connect Founding Source
        </Button>
      </div>
    </form>
  );

  createFundingSourceDemo = async ({ accountNumber, routingNumber }) => {
    const { createFundingSourceDemo, lastCreatedContractor } = this.props;

    await createFundingSourceDemo({
      id: lastCreatedContractor.id,
      data: {
        accountNumber,
        routingNumber,
      },
    });
  };

  handleSubmit = async (data, form) => {
    const normalizedData = validationSchema.cast(data);
    const { routingNumber, accountNumber } = normalizedData;

    try {
      await this.createFundingSourceDemo({ accountNumber, routingNumber });

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
      const { lastCreatedContractor } = this.props;
      onSubmit(lastCreatedContractor);
    }

    this.props.history.push('/register/thanks');
  };
}
const mapStateToProps = state => ({
  lastCreatedContractor: state.users.lastCreatedContractor,
});

const mapDispatch = ({ users: { createFundingSourceDemo } }) => ({
  createFundingSourceDemo,
});

export default connect(mapStateToProps, mapDispatch)(Bank);
