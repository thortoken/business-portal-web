import React, { Component } from 'react';
import _ from 'lodash';

import { Table, Button } from 'antd';

import TitleWithIcon from '../TitleWithIcon';

import './JobsList.css';

const { Column } = Table;

const jobsPerType = jobs => _.groupBy(jobs, job => job.jobId);

const calculateJobs = jobs => {
  const obj = {};
  Object.entries(jobs).forEach(([jobId, job]) => {
    obj[jobId] = {
      jobId,
      name: job[0].jobName,
      count: job.length,
      prev: 0,
      current: _.sumBy(job, 'jobCost'),
      jobs: job,
    };
  });

  return obj;
};

export class JobsList extends Component {
  render() {
    const { jobs, paidTransactions, jobsList, renderAmount } = this.props;

    const summarizedJobs = calculateJobs(jobsPerType(jobsList));
    let paidTransactionsGroupedByUsers = _.groupBy(paidTransactions, 'contractor.id');

    Object.keys(summarizedJobs).forEach(() => {
      const paidTransactionForUser = paidTransactionsGroupedByUsers[jobsList[0].contractor.id];
      const paidTransactionForUserGroupedByJobId = _.groupBy(paidTransactionForUser, 'jobId');

      Object.keys(summarizedJobs).forEach(summarizedJobKey => {
        summarizedJobs[summarizedJobKey].prev = _.sumBy(
          paidTransactionForUserGroupedByJobId[summarizedJobKey],
          'jobCost'
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

  handleCustom = e => {
    console.log('event', e);
  };
}

export default JobsList;
