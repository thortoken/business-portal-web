import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import classNames from 'classnames';
import { formFields, validationSchema } from './formSchema';
import './EditTransaction.scss';
import NotificationService from '~services/notification';
import { handleFormHttpResponse } from '~utils/forms/errors';

export class EditTransaction extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    editTransaction: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      transaction: null,
    };
    this.prepareTransaction();
  }

  prepareTransaction = async () => {
    const { match, getTransaction } = this.props;
    const transaction = await getTransaction(match.params.id);
    this.setState({
      formData: { name: transaction.job.name, value: transaction.value },
      transaction,
    });
  };

  render() {
    const { isLoading } = this.props;
    const { formData } = this.state;
    return (
      <div className="EditTransaction">
        {!isLoading && (
          <Formik
            initialValues={formData}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize>
            {this.renderForm}
          </Formik>
        )}
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

      <div className="EditTransaction__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="EditTransaction__button-container--button">
          Save
        </Button>
      </div>
    </form>
  );

  handleSubmit = async (data, form) => {
    const { editTransaction, match } = this.props;
    const { transaction } = this.state;
    let transactionData = validationSchema.cast(data);
    transactionData['id'] = match.params.id;
    transactionData['jobId'] = transaction.job.id;
    try {
      await editTransaction(transactionData);
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
      description: 'Transaction successfully edited.',
    });
    history.goBack();
  };
}

const mapStateToProps = state => ({
  isLoading: state.loading.effects.transactions.getTransaction,
});

const mapDispatchToProps = dispatch => ({
  editTransaction: dispatch.transactions.editTransaction,
  getTransaction: dispatch.transactions.getTransaction,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTransaction);
