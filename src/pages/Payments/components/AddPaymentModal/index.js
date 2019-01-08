import React, { Component } from 'react';
import { Modal, Button, Select, Spin, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Formik } from 'formik';

import SelectField from '~components/SelectField';
import FormField from '~components/FormField';
import NotificationService from '../../../../services/notification';
import { formFields, validationSchema, prepareFormFieldsAndValidation } from './formSchema';
import { formatUsd } from '~utils/number';
import { handleFormHttpResponse } from '~utils/forms/errors';
import './AddPayment.scss';

const { Option } = Select;

const generateJobs = (list, customJobName) => {
  const jobs = list.map(item => (
    <Option key={item.id} value={item.id}>
      {`${item.name} - ${formatUsd(item.value)}`}
    </Option>
  ));
  jobs.push(
    <Option key={'custom-job'} value={'custom-job'}>
      {`${customJobName} (create new)`}
    </Option>
  );
  return jobs;
};

export class AddPaymentModal extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    jobsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    addExistingTransaction: PropTypes.func.isRequired,
    onChangeVisibility: PropTypes.func,
    userId: PropTypes.string,
    canAddCustom: PropTypes.bool,
  };

  state = {
    isValid: false,
    errorMsg: '',
    formData: prepareFormFieldsAndValidation(),
    jobsList: [],
    isCustomJob: false,
    customJobName: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.jobsList !== prevState.jobsList) {
      return { jobsList: nextProps.jobsList };
    }
    return null;
  }

  handleModalCancel = () => {
    const { onChangeVisibility } = this.props;
    onChangeVisibility(false);
    this.setState({
      errorMsg: '',
      formData: prepareFormFieldsAndValidation(),
      isCustomJob: false,
      customJobName: '',
    });
  };

  handleOnSelect = event => {
    if (event.value) {
      const filtered = this.state.jobsList.filter(entry => {
        return entry.id === event.value;
      });
      if (filtered.length > 0) {
        this.setState({
          formData: prepareFormFieldsAndValidation({
            jobId: filtered[0].id,
            name: filtered[0].name,
            value: filtered[0].value,
            description: filtered[0].description,
          }),
          isValid: true,
          isCustomJob: false,
          customJobName: '',
        });
      } else {
        this.setState({
          formData: prepareFormFieldsAndValidation({
            jobId: undefined,
            name: this.state.customJobName,
            value: undefined,
            description: undefined,
          }),
          isValid: true,
          isCustomJob: true,
        });
      }
    }
  };

  handleSubmit = async (data, form) => {
    const { addExistingTransaction, addCustomTransaction, userId } = this.props;
    let transactionData = validationSchema.cast(data);
    transactionData['userId'] = userId;

    try {
      if (this.state.isCustomJob) {
        await addCustomTransaction(transactionData);
      } else {
        await addExistingTransaction(transactionData);
      }
      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    const { onChangeVisibility } = this.props;
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Payment successfully added.',
    });
    onChangeVisibility(false, true);
    this.setState({
      errorMsg: '',
      formData: prepareFormFieldsAndValidation(),
      isCustomJob: false,
      customJobName: '',
    });
  };

  handleUseExistingJobClick = () => {
    this.setState({
      errorMsg: '',
      formData: prepareFormFieldsAndValidation(),
      isCustomJob: false,
      customJobName: '',
      isValid: false,
    });
  };

  render() {
    const { errorMsg, formData, jobsList, isValid } = this.state;
    const { isLoading } = this.props;

    return (
      <Modal
        title="Add a payment"
        visible={this.props.isModalVisible}
        footer={null}
        onCancel={this.handleModalCancel}
        destroyOnClose>
        <div className="AddPayment_errors">{errorMsg}</div>
        <Spin spinning={isLoading}>
          {jobsList.length > 0 &&
            !isLoading && (
              <Formik
                initialValues={formData.initialValues}
                onSubmit={this.handleSubmit}
                validationSchema={validationSchema}
                isInitialValid={isValid}
                enableReinitialize>
                {this.renderForm}
              </Formik>
            )}
        </Spin>
      </Modal>
    );
  }

  renderForm = ({ handleSubmit, isSubmitting, values, dirty, valid }) => {
    const { customJobName, jobsList, isCustomJob, isValid } = this.state;
    return (
      <form onSubmit={handleSubmit}>
        {Object.entries(formFields).map(([name, options]) => {
          if (name === 'jobId' && !isCustomJob) {
            return (
              <FormField
                key={name}
                name={name}
                component={SelectField}
                dataSource={generateJobs(jobsList, customJobName)}
                showSearch
                filterOption={(inputValue, option) =>
                  option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onSearch={value => {
                  this.setState({ customJobName: value });
                }}
                onSelect={this.handleOnSelect}
                className={classNames('', {
                  'InputGroup--wide': options.input.wide,
                })}
                label={options.label}
                {...options.input}
              />
            );
          } else if (name === 'name') {
            if (isCustomJob) {
              return (
                <FormField
                  key={name}
                  name={name}
                  label={options.label}
                  {...options.input}
                  className={classNames('InputGroup--addon', {
                    'InputGroup--wide': options.input.wide,
                  })}
                  addonBefore={
                    <Tooltip title="Cancel create new">
                      <button
                        className="InputGroup--cancel-button"
                        type="button"
                        tabIndex="-1"
                        onClick={this.handleUseExistingJobClick}>
                        X
                      </button>
                    </Tooltip>
                  }
                />
              );
            }
          } else if (name === 'description') {
            if (isCustomJob) {
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
          } else if (name === 'value') {
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
          return null;
        })}

        <div className="AddPayment__button-container">
          <Button
            disabled={!isValid}
            size="large"
            type="primary"
            loading={this.isSubmitting}
            htmlType="submit"
            className="AddPayment__button-container--button">
            Add
          </Button>
        </div>
      </form>
    );
  };
}

export default AddPaymentModal;
