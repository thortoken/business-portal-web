import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Table, Button } from 'antd';

import TitleWithIcon from '../TitleWithIcon';
import {
  AddTransactionModal,
  validationSchema,
} from '../../../../Payments/components/AddTransactionModal';

import './JobsList.css';

const { Column } = Table;

const jobsPerType = jobs => _.groupBy(jobs, j => j.job.id);

const sumTransactions = transactions => {
  return transactions.reduce((prevValue, currValue) => {
    return +prevValue + currValue.job.value * currValue.quantity;
  }, 0);
};

const calculateJobs = jobs => {
  const obj = {};
  Object.entries(jobs).forEach(([jobId, job]) => {
    obj[jobId] = {
      jobId,
      name: job[0].job.name,
      count: job.length,
      prev: 0,
      current: sumTransactions(jobs[jobId]),
      jobs: job,
    };
  });

  return obj;
};

export class JobsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
    };
  }

  handleModalSave = async (transaction, form) => {
    const { createTransaction, userId } = this.props;

    const data = {
      ...validationSchema.cast(transaction),
      userId,
    };
    try {
      await createTransaction(data);
      this.setState({ isModalVisible: false });
    } catch (err) {
      if (err.response) {
        this.setState({ createTransactionErrorMessage: err.response.data.error });
      }
      form.setSubmitting(false);
    }
  };

  handleModalCancel = () => {
    this.setState({ isModalVisible: false, createTransactionErrorMessage: '' });
  };

  render() {
    const { jobs, usersPaidTransactions, jobsList, renderAmount } = this.props;
    const { createTransactionErrorMessage } = this.state;

    const summarizedJobs = calculateJobs(jobsPerType(jobsList));
    let paidTransactionsGroupedByUsers = new Map(usersPaidTransactions.items.map(t => [t.id, t]));

    Object.keys(summarizedJobs).forEach(() => {
      const paidTransactionForUser = paidTransactionsGroupedByUsers[jobsList[0].userId];
      const paidTransactionForUserGroupedByJobId = _.groupBy(paidTransactionForUser, 'jobId');

      Object.keys(summarizedJobs).forEach(summarizedJobKey => {
        summarizedJobs[summarizedJobKey].prev = _.sumBy(
          paidTransactionForUserGroupedByJobId[summarizedJobKey],
          item => parseFloat(item.job.value)
        );
      });

      _.difference(
        Object.keys(paidTransactionForUserGroupedByJobId),
        Object.keys(summarizedJobs)
      ).forEach(jobId => {
        summarizedJobs[jobId] = {
          jobId,
          ...summarizedJobs[jobId],
          count: paidTransactionForUserGroupedByJobId[jobId].length,
          current: 0,
          jobs: paidTransactionForUserGroupedByJobId[jobId],
          name: jobs[jobId].name,
        };
      });
    });

    return (
      <div>
        <AddTransactionModal
          onSave={this.handleModalSave}
          onCancel={this.handleModalCancel}
          isModalVisible={this.state.isModalVisible}
          errorMsg={createTransactionErrorMessage}
        />
        <Table
          className="JobsList"
          showHeader={false}
          dataSource={Object.keys(summarizedJobs).map((jobsGroup, index) => {
            return { ...summarizedJobs[jobsGroup], key: index };
          })}
          pagination={false}>
          <Column align="center" dataIndex="name" title="Name" width="42%" />
          <Column align="center" dataIndex="count" title="Num Jobs" width="12%" />
          <Column align="center" dataIndex="prev" render={renderAmount} title="Prev" width="18%" />
          <Column
            align="center"
            dataIndex="current"
            render={renderAmount}
            width="18%"
            title={<TitleWithIcon title="Current" icon="dollar" />}
          />
        </Table>
        <div className="JobsList-button">
          <Button ghost onClick={this.handleCustom}>
            + Add Custom
          </Button>
        </div>
      </div>
    );
  }

  handleCustom = () => {
    this.setState({ isModalVisible: true });
  };
}
const mapStateToProps = state => ({ auth: { user } }) => ({ user });

const mapDispatch = ({ transactions: { createTransaction } }) => ({
  createTransaction,
});

export default connect(mapStateToProps, mapDispatch)(JobsList);
