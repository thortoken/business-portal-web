import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { Icon, Table, Button, Modal } from 'antd';

import { Formik } from 'formik';

import FormField from '~components/FormField';

import { getCurrentTwoWeeksPeriod, renderDateTime } from '~utils/time';
import { formatUsd } from '~utils/number';

import { initialValues, formFields, validationSchema } from './formSchema';

import './ContractorTransactions.css';

const { Column } = Table;

class ContractorTransactions extends React.Component {
  static propTypes = {
    isModalVisible: PropTypes.bool,
    isDeleteModalVisible: PropTypes.bool,
    selectedTransactionsIds: PropTypes.object,
  };

  state = {
    isModalVisible: false,
    isDeleteModalVisible: false,
    selectedTransactionsIds: new Set(),
    errorMsg: '',
  };

  componentDidMount() {
    const { match, getUser, getJob, getTransactionsForContractorByJobId } = this.props;

    getUser(match.params.id);
    getJob(match.params.jobId);
    getTransactionsForContractorByJobId({
      userId: match.params.id,
      jobId: match.params.jobId,
      ...getCurrentTwoWeeksPeriod(),
    });
  }

  render() {
    const { currentUser, currentJob, userTransactionsByJob, loadingTransactions } = this.props;
    const { selectedTransactionsIds, errorMsg, isModalVisible, isDeleteModalVisible } = this.state;
    const { startDate, endDate } = getCurrentTwoWeeksPeriod();

    return (
      <div className="ContractorTransactions">
        <Modal
          title={currentJob && `Add transaction ${currentJob.name}`}
          visible={isModalVisible}
          footer={null}
          onCancel={this.handleModalCancel}
          destroyOnClose>
          <div className="">{errorMsg}</div>
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleModalSave}
            validationSchema={validationSchema}>
            {this.renderForm}
          </Formik>
        </Modal>
        <Modal
          className="ContractorTransactions__delete-modal"
          visible={isDeleteModalVisible}
          footer={null}
          onCancel={this.handleDeleteModalCancel}
          destroyOnClose>
          <div className="ContractorTransactions__delete-msg">
            Are you sure you want to delete this event{selectedTransactionsIds.size > 1 ? 's' : ''}?
          </div>
          <div className="">
            <Button ghost type="ghost" size="default" onClick={this.handleCancelDeleteModal}>
              Cancel
            </Button>
            <Button type="danger" size="default" onClick={this.handleConfirmDeleteTransactions}>
              Yes, Delete
            </Button>
          </div>
        </Modal>
        <div className="ContractorTransactions__actions">
          <div className="ContractorTransactions__buttons">
            <Button
              type="danger"
              size="default"
              onClick={this.handleDeleteTransactions}
              disabled={selectedTransactionsIds.size <= 0}>
              Delete
            </Button>
          </div>
        </div>
        <div className="ContractorTransactions__box">
          <div className="ContractorTransactions__header">
            <Link to="/payments">
              <Icon type="close-circle" theme="outlined" />
            </Link>
            <span>
              {startDate.format('MMM D')} - {endDate.format('MMM D YYYY')} >{' '}
              {currentUser && (
                <span>
                  {currentUser.tenantProfile.firstName} {currentUser.tenantProfile.lastName} >
                </span>
              )}
              {currentJob && <span> {currentJob.name}</span>}
            </span>
            <div className="ContractorTransactions__add-new" onClick={this.handleAddNew}>
              <Icon type="plus-circle" theme="outlined" />
              <span>Add new {currentJob && currentJob.name}</span>
            </div>
          </div>
          <div className="ContractorTransactions__body">
            <div className="ContractorTransactions__table">
              <Table
                pagination={{ position: 'none' }}
                dataSource={userTransactionsByJob}
                className=""
                loading={loadingTransactions}
                onChange={this.handleTableChange}>
                <Column
                  align="center"
                  dataIndex="createdAt"
                  title="Date/Time"
                  render={renderDateTime}
                  width="20%"
                />
                <Column align="center" dataIndex="location" title="City" width="20%" />
                <Column
                  align="center"
                  dataIndex="value"
                  render={this.renderAmount}
                  title="Payment Amount"
                  width="50%"
                />
                <Column
                  className="ContractorTransactions__checkbox"
                  title=""
                  align="center"
                  width="10%"
                  render={(text, record) => (
                    <button
                      className={classnames('ContractorTransactions__checkbox--circle', {
                        active: this.isActive(record),
                      })}
                      onClick={() => this.handleSelectTransaction(record)}
                    />
                  )}
                />
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderAmount = amount => formatUsd(amount);

  isActive = record => {
    const { selectedTransactionsIds } = this.state;
    return selectedTransactionsIds.has(record.id);
  };

  handleAddNew = () => {
    this.setState({ isModalVisible: true });
  };

  handleDeleteTransactions = () => {
    this.setState({ isDeleteModalVisible: true });
  };

  handleConfirmDeleteTransactions = () => {
    const { selectedTransactionsIds } = this.state;
    console.log('ids to delete', selectedTransactionsIds);
  };

  renderForm = ({ handleSubmit, isSubmitting, values, dirty, isValid }) => {
    return (
      <form onSubmit={handleSubmit}>
        {Object.entries(formFields).map(([name, options]) => (
          <FormField
            key={name}
            name={name}
            label={options.label}
            className="ContractorTransactions__modal-input"
            {...options.input}
          />
        ))}

        <div className="ContractorTransactions__create-btn">
          <Button disabled={!isValid} type="primary" loading={isSubmitting} htmlType="submit">
            Add transaction
          </Button>
        </div>
      </form>
    );
  };

  handleModalSave = async (transaction, form) => {
    const { createTransaction, currentUser, currentJob } = this.props;
    let { selectedTransactionsIds } = this.state;

    const data = {
      ...validationSchema.cast(transaction),
      userId: currentUser.id,
      jobId: currentJob.id,
    };

    console.log('new transaction', data);

    try {
      // await createTransaction(data);
      this.setState({ isModalVisible: false, errorMsg: '' });
      selectedTransactionsIds = new Set();
      // TODO refresh data
    } catch (err) {
      if (err.response) {
        this.setState({ errorMsg: err.response.data.error });
      }
      form.setSubmitting(false);
    }
  };

  handleCancelDeleteModal = () => {
    this.setState({ isDeleteModalVisible: false });
  };

  handleModalCancel = () => {
    this.setState({ isModalVisible: false, errorMsg: '' });
  };

  handleDeleteModalCancel = () => {
    this.setState({ isDeleteModalVisible: false });
  };

  handleSelectTransaction = user => {
    const { selectedTransactionsIds } = this.state;

    const contractorId = user.id;

    if (selectedTransactionsIds.has(contractorId)) {
      selectedTransactionsIds.delete(contractorId);
    } else {
      selectedTransactionsIds.add(contractorId);
    }

    this.setState({
      selectedTransactionsIds,
    });
  };
}
const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  currentJob: state.jobs.currentJob,
  userTransactionsByJob: state.transactions.userTransactionsByJob,
  loadingTransactions: state.loading.effects.transactions.getTransactions,
});

const mapDispatchToProps = dispatch => ({
  getUser: dispatch.users.getUser,
  getJob: dispatch.jobs.getJob,
  getTransactionsForContractorByJobId: dispatch.transactions.getTransactionsForContractorByJobId,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorTransactions);
