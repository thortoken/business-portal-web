import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Select, Spin } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import SelectField from '~components/SelectField';

import classNames from 'classnames';
import { formFields, validationSchema, prepareFormFieldsAndValidation } from './formSchema';
import './AddExistingTransaction.scss';
import NotificationService from '~services/notification';
import { handleFormHttpResponse } from '~utils/forms/errors';

import { formatUsd } from '~utils/number';

const { Option } = Select;

const generateJobs = list => {
  return list.map(item => (
    <Option key={item.id} value={item.id}>
      {`${item.name} - ${formatUsd(item.value)}`}
    </Option>
  ));
};

export class AddExistingTransaction extends React.Component {
  static propTypes = {
    getJobs: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    jobsList: PropTypes.arrayOf(PropTypes.object),
    addExistingTransaction: PropTypes.func,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formData: prepareFormFieldsAndValidation(),
      jobsList: [],
      valid: false,
    };
  }

  componentDidMount() {
    const { getJobs } = this.props;
    getJobs({
      page: 1,
      limit: 200,
      isActive: true,
      isCustom: false,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.jobsList !== prevState.jobsList) {
      return {
        jobsList: nextProps.jobsList,
      };
    }
    return null;
  }

  render() {
    const { jobsList, formData } = this.state;
    const { isLoading } = this.props;
    return (
      <div className="AddExistingTransaction">
        <Spin spinning={isLoading}>
          {jobsList.length > 0 &&
            !isLoading && (
              <Formik
                initialValues={formData.initialValues}
                onSubmit={this.handleSubmit}
                validationSchema={validationSchema}
                isInitialValid={this.state.valid}
                enableReinitialize>
                {this.renderForm}
              </Formik>
            )}
        </Spin>
      </div>
    );
  }

  handleChange = event => {
    if (event.value) {
      const filtered = this.state.jobsList.filter(entry => {
        return entry.id === event.value;
      });
      if (filtered.length > 0) {
        this.setState({
          formData: prepareFormFieldsAndValidation({ jobId: event.value, value: filtered[0].value }),
          valid: true,
        });
      }
    }
  };

  renderForm = ({ handleSubmit, isSubmitting, values, dirty, valid }) => (
    <form onSubmit={handleSubmit}>
      {Object.entries(formFields).map(([name, options]) => {
        if (name === 'jobId') {
          return (
            <FormField
              key={name}
              name={name}
              component={SelectField}
              dataSource={generateJobs(this.state.jobsList)}
              onSelect={this.handleChange}
              className={classNames('', {
                'InputGroup--wide': options.input.wide,
              })}
              label={options.label}
              {...options.input}
            />
          );
        } else {
          return (
            <FormField
              key={name}
              name={name}
              label={options.label}
              {...options.input}
              className={classNames('', {
                'InputGroup--wide': options.input.wide,
              })}
            />
          );
        }
      })}

      <div className="AddExistingTransaction__button-container">
        <Button
          disabled={!this.state.valid || values.value === '' || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="AddExistingTransaction__button-container--button">
          Add
        </Button>
      </div>
    </form>
  );

  handleSubmit = async (data, form) => {
    const { addExistingTransaction, match } = this.props;
    let transactionData = validationSchema.cast(data);
    transactionData['userId'] = match.params.id;
    try {
      await addExistingTransaction(transactionData);
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
  isLoading: state.loading.effects.jobs.getJobs,
  jobsList: state.jobs.jobsList,
});

const mapDispatchToProps = dispatch => ({
  addExistingTransaction: dispatch.transactions.addExistingTransaction,
  getJobs: dispatch.jobs.getJobs,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExistingTransaction);
