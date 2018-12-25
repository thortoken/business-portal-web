import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import classNames from 'classnames';
import { initialValues, formFields, validationSchema } from './formSchema';
import './AddCustomTransaction.scss';
import NotificationService from '~services/notification';
import { handleFormHttpResponse } from '~utils/forms/errors';

export class AddCustomTransaction extends React.Component {
  static propTypes = {
    addCustomTransaction: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div className="AddCustomTransaction">
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
          {...options.input}
          className={classNames('', {
            'InputGroup--wide': options.input.wide,
          })}
        />
      ))}

      <div className="AddCustomTransaction__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="AddCustomTransaction__button-container--button">
          Add
        </Button>
      </div>
    </form>
  );

  handleSubmit = async (data, form) => {
    const { addCustomTransaction, match } = this.props;
    let transactionData = validationSchema.cast(data);
    transactionData['userId'] = match.params.id;
    try {
      await addCustomTransaction(transactionData);
      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    const { history } = this.props;
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Transaction successfully added.',
    });
    history.goBack();
  };
}

const mapStateToProps = state => ({
  isLoading: state.loading.effects.transactions.addCustomTransaction,
});

const mapDispatchToProps = dispatch => ({
  addCustomTransaction: dispatch.transactions.addCustomTransaction,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomTransaction);
