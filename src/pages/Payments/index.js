import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';

import { getTransactions, pauseTransactions } from '~redux/actions/transactions';
import { getJobs, pauseJobs } from '~redux/actions/jobs';

import Box from '~components/Box';
import Header from '~components/Header';
import Summary from './components/Summary';
import BottomBar from './components/BottomBar';

import { getCurrentTwoWeeksPeriod, getPreviousTwoWeeksPeriod } from '~utils/time';
import { formatUsd } from '~utils/number';

import './Payments.css';

const { Column } = Table;

const TitleWithIcon = ({ title, icon }) => {
  return (
    <span>
      <Icon type={icon} /> {title}
    </span>
  );
};

const transactionsPerContractor = transactions =>
  _.groupBy(transactions, transaction => transaction.contractor.id);

const jobsPerType = jobs => _.groupBy(jobs, job => job.jobId);

const calculateSummaryTransactions = (transactions, period) => {
  const datesForPeriod =
    period === 'prev' ? getPreviousTwoWeeksPeriod() : getCurrentTwoWeeksPeriod();
  const obj = { ...datesForPeriod };
  obj.contractorsCount = Object.keys(transactionsPerContractor(transactions)).length;
  obj.value = _.sumBy(transactions, 'jobCost');
  return obj;
};

const calculateJobs = jobs => {
  const obj = {};
  Object.keys(jobs).forEach(jobId => {
    obj[jobId] = {
      jobId,
      name: jobs[jobId][0].jobName,
      count: jobs[jobId].length,
      prev: 0,
      current: _.sumBy(jobs[jobId], 'jobCost'),
      jobs: jobs[jobId],
    };
  });

  return obj;
};

const calculateTransactions = (transactions, jobs) => {
  let groupedContractors = transactionsPerContractor(transactions);
  let summarizedContractors = Object.keys(groupedContractors).map(cId => {
    const contractor = groupedContractors[cId][0].contractor;
    return {
      rank: 0,
      contractor: `${contractor.firstName} ${contractor.lastName}`,
      contractorId: cId,
      numOfJobs: groupedContractors[cId].length,
      jobs: groupedContractors[cId].map(job => {
        return {
          ...job,
          jobName: jobs[job.jobId] ? jobs[job.jobId].name : '',
        };
      }),
      salary: _.sumBy(groupedContractors[cId], 'jobCost'),
    };
  });

  return _.sortBy(summarizedContractors, 'salary')
    .reverse()
    .map((contractor, index) => ({ ...contractor, key: index + 1 }));
};

class Payments extends React.Component {
  static propTypes = {
    getTransactions: PropTypes.func.isRequired,
    pauseTransactions: PropTypes.func.isRequired,
    pendingTransactions: PropTypes.arrayOf(PropTypes.object).isRequired,
    paidTransactions: PropTypes.arrayOf(PropTypes.object).isRequired,
    jobs: PropTypes.object.isRequired,
  };

  state = {
    previous: {
      value: 0,
      contractorsCount: 0,
      startDate: new Date(),
      endDate: new Date(),
    },
    current: {
      value: 0,
      contractorsCount: 0,
      startDate: new Date(),
      endDate: new Date(),
    },
    previousTransactionsMap: new Map(),
    calculatedPreviousTransactions: [],
    calculatedCurrentTransactions: [],
    pendingTransactions: [],
    selectedTransactionsIds: [],
    selectedContractorsIds: [],
    selectedTransactionsSummaryValue: 0,
  };

  componentDidMount() {
    this.props.getJobs();
    this.props.getTransactions({ status: 'PENDING', ...getCurrentTwoWeeksPeriod() });
    this.props.getTransactions({ status: 'PAID', ...getPreviousTwoWeeksPeriod() });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const hasJobs = Object.keys(nextProps.jobs).length > 0;

    if (nextProps.pendingTransactions !== prevState.pendingTransactions) {
      const objState = {
        pendingTransactions: nextProps.pendingTransactions,
      };

      if (hasJobs) {
        objState.current = calculateSummaryTransactions(nextProps.pendingTransactions, 'curr');
        objState.calculatedCurrentTransactions = calculateTransactions(
          nextProps.pendingTransactions,
          nextProps.jobs
        );
      }

      return objState;
    }

    if (nextProps.paidTransactions !== prevState.paidTransactions) {
      const objState = {
        paidTransactions: nextProps.paidTransactions,
      };
      if (hasJobs) {
        objState.previous = calculateSummaryTransactions(nextProps.paidTransactions, 'prev');
        objState.calculatedPreviousTransactions = calculateTransactions(
          nextProps.paidTransactions,
          nextProps.jobs
        );
        objState.previousTransactionsMap = new Map(
          objState.calculatedPreviousTransactions.map(t => [t.contractorId, t.salary])
        );
      }
      return objState;
    }
    return null;
  }

  componentWillUnmount() {
    this.props.pauseTransactions();
    this.props.pauseJobs();
  }

  render() {
    const {
      previous,
      current,
      calculatedCurrentTransactions,
      selectedTransactionsIds,
      selectedContractorsIds,
      selectedTransactionsSummaryValue,
    } = this.state;

    return (
      <div>
        <Header title="Payments" size="medium" />

        <Summary previous={previous} current={current} />

        <Box>
          <Table
            dataSource={calculatedCurrentTransactions}
            bordered
            className="Payments-table"
            expandedRowRender={record => <div>{this.renderJobsList(record.jobs)}</div>}>
            <Column align="center" dataIndex="key" title="Rank" width="10%" />
            <Column
              align="center"
              dataIndex="contractor"
              width="25%"
              title={<TitleWithIcon title="Contractor" icon="user" />}
            />
            <Column align="center" dataIndex="numOfJobs" title="Num Jobs" width="10%" />
            <Column
              align="center"
              dataIndex="contractorId"
              render={this.showPreviousSalary}
              title="Prev"
              width="15%"
            />
            <Column
              align="center"
              className="Payments-table-current"
              dataIndex="salary"
              render={this.renderAmount}
              width="15%"
              title={<TitleWithIcon title="Current" icon="dollar" />}
            />
            <Column
              className="Payments-table-approve"
              title="Approval"
              align="center"
              width="25%"
              render={(text, record) => (
                <button
                  className={classnames(null, { active: this.isActive(record) })}
                  onClick={() => this.handleSelectTransaction(record)}>
                  <Icon type="check" />
                </button>
              )}
            />
          </Table>
        </Box>
        <BottomBar
          selectedTransaction={selectedTransactionsIds}
          selectedContractorsIds={selectedContractorsIds}
          selectedTransactionsSummaryValue={selectedTransactionsSummaryValue}
        />
      </div>
    );
  }

  isActive = record => {
    const { selectedContractorsIds } = this.state;
    return !!selectedContractorsIds.find(contractor => contractor === record.contractorId);
  };

  handleSelectTransaction = record => {
    const { selectedTransactionsIds, selectedContractorsIds } = this.state;
    let { selectedTransactionsSummaryValue } = this.state;

    if (selectedContractorsIds.indexOf(record.jobs[0].contractor.id) === -1) {
      selectedContractorsIds.push(record.jobs[0].contractor.id);
    } else if (selectedContractorsIds.indexOf(record.jobs[0].contractor.id) > -1) {
      selectedContractorsIds.splice(
        selectedContractorsIds.indexOf(record.jobs[0].contractor.id),
        1
      );
    }

    record.jobs.forEach(job => {
      if (selectedTransactionsIds.indexOf(job.id) === -1) {
        selectedTransactionsIds.push(job.id);
        selectedTransactionsSummaryValue += job.jobCost;
      } else {
        selectedTransactionsIds.splice(selectedTransactionsIds.indexOf(job.id), 1);
        selectedTransactionsSummaryValue -= job.jobCost;
      }
    });

    this.setState({
      selectedTransactionsIds,
      selectedContractorsIds,
      selectedTransactionsSummaryValue,
    });
  };

  handleTypeChange = e => this.setState({ type: e.target.value });

  renderAmount = amount => formatUsd(amount);

  showPreviousSalary = contractorId => {
    const { previousTransactionsMap } = this.state;
    return previousTransactionsMap.get(contractorId)
      ? formatUsd(previousTransactionsMap.get(contractorId))
      : '$0';
  };

  renderJobsList = jobsList => {
    const { paidTransactions } = this.state;
    const { jobs } = this.props;

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
      <Table
        className="Payments-table-nested"
        showHeader={false}
        dataSource={Object.keys(summarizedJobs).map((jobsGroup, index) => {
          return { ...summarizedJobs[jobsGroup], key: index };
        })}
        pagination={false}>
        <Column align="center" dataIndex="name" title="Name" width="42%" />
        <Column align="center" dataIndex="count" title="Num Jobs" width="12%" />
        <Column
          align="center"
          dataIndex="prev"
          render={this.renderAmount}
          title="Prev"
          width="18%"
        />
        <Column
          align="center"
          dataIndex="current"
          render={this.renderAmount}
          width="18%"
          title={<TitleWithIcon title="Current" icon="dollar" />}
        />
      </Table>
    );
  };
}

const mapStateToProps = state => ({
  transactions: state.transactions.transactions,
  paidTransactions: state.transactions.paidTransactions,
  pendingTransactions: state.transactions.pendingTransactions,
  jobs: state.jobs.jobs,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTransactions,
      pauseTransactions,
      getJobs,
      pauseJobs,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
