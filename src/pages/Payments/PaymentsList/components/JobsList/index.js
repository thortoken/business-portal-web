import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Table, Button } from 'antd';

import TitleWithIcon from '../TitleWithIcon';
import { AddTransactionModal } from '../../../../Payments/components/AddTransactionModal';

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

  render() {
    const {
      jobs,
      usersPaidTransactions,
      jobsList,
      renderAmount,
      userId,
      createTransaction,
    } = this.props;

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
          userId={userId}
          createTransaction={createTransaction}
          isModalVisible={this.state.isModalVisible}
          onChangeVisibility={this.onChangeVisibility}
        />
        <Table
          className="JobsList"
          showHeader={false}
          dataSource={Object.keys(summarizedJobs).map((jobsGroup, index) => {
            return { ...summarizedJobs[jobsGroup], key: index };
          })}
          pagination={false}>
          <Column align="center" dataIndex="name" title="Name" width="30%" />
          <Column align="center" dataIndex="count" title="Num Jobs" width="15%" />
          <Column
            align="center"
            dataIndex="current"
            render={renderAmount}
            width="20%"
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

  onChangeVisibility = (isModalVisible, refreshData = false) => {
    this.setState({ isModalVisible });
  };

  handleCustom = () => {
    this.setState({ isModalVisible: true });
  };
}

const mapDispatch = ({ transactions: { createTransaction } }) => ({
  createTransaction,
});

const mapStateToProps = state => ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps, mapDispatch)(JobsList);
