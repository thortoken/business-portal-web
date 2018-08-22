import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Checkbox } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import classnames from 'classnames';

import { getTransactions, pauseTransactions } from '~redux/actions/transactions';
import { getJobs, pauseJobs } from '~redux/actions/jobs';

import Box from '~components/Box';
import Header from '~components/Header';
import BottomBar from '~components/BottomBar';
import Summary from './components/Summary';
import JobsList from './components/JobsList';
import TitleWithIcon from './components/TitleWithIcon';

import { getCurrentTwoWeeksPeriod, getPreviousTwoWeeksPeriod } from '~utils/time';
import { formatUsd } from '~utils/number';

import './Payments.css';

const { Column } = Table;

const transactionsPerContractor = transactions =>
  _.groupBy(transactions, transaction => transaction.contractor.id);

const calculateSummaryTransactions = (transactions, period) => {
  const datesForPeriod =
    period === 'prev' ? getPreviousTwoWeeksPeriod() : getCurrentTwoWeeksPeriod();
  const obj = { ...datesForPeriod };
  obj.contractorsCount = Object.keys(transactionsPerContractor(transactions)).length;
  obj.value = _.sumBy(transactions, 'jobCost');
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
    checked: false,
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
    selectedTransactionsIds: new Set(),
    selectedContractorsIds: new Set(),
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
      checked,
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

        <div className="Payments-selector">
          <Checkbox onChange={this.onSelectAll} checked={checked} /> Select All
        </div>

        <Box>
          <Table
            dataSource={calculatedCurrentTransactions}
            bordered
            className="Payments-table"
            expandedRowRender={record => <div>{this.renderJobsList(record.jobs)}</div>}>
            <Column
              align="center"
              dataIndex="key"
              title="Rank"
              width="10%"
              className="Payments-rank-selector"
            />
            <Column
              align="center"
              dataIndex="contractor"
              width="25%"
              title={<TitleWithIcon title="Contractor" icon="user" />}
              render={this.showContractorName}
              className="Payments-contractor-selector"
            />
            <Column
              align="center"
              dataIndex="numOfJobs"
              title="Num Jobs"
              width="10%"
              className="Payments-numOfJobs-selector"
            />
            <Column
              align="center"
              dataIndex="contractorId"
              render={this.showPreviousSalary}
              title="Prev"
              width="15%"
              className="Payments-prev-selector"
            />
            <Column
              align="center"
              className="Payments-table-current Payments-current-selector"
              dataIndex="salary"
              render={this.renderAmount}
              width="15%"
              title={<TitleWithIcon title="Current" icon="dollar" />}
            />
            <Column
              className="Payments-table-approve Payments-approve-selector"
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
          selectedTransactionsIds={selectedTransactionsIds}
          selectedContractorsIds={selectedContractorsIds}
          selectedTransactionsSummaryValue={selectedTransactionsSummaryValue}
        />
      </div>
    );
  }

  isActive = record => {
    const { selectedContractorsIds } = this.state;
    return selectedContractorsIds.has(record.contractorId);
  };

  handleSelectTransaction = record => {
    const { selectedTransactionsIds, selectedContractorsIds, pendingTransactions } = this.state;
    let { selectedTransactionsSummaryValue } = this.state;
    const contractorId = record.jobs[0].contractor.id;

    if (selectedContractorsIds.has(contractorId)) {
      selectedContractorsIds.delete(contractorId);
    } else {
      selectedContractorsIds.add(contractorId);
    }

    record.jobs.forEach(job => {
      const jobId = job.id;

      if (selectedTransactionsIds.has(jobId)) {
        selectedTransactionsIds.delete(jobId);
        selectedTransactionsSummaryValue -= job.jobCost;
      } else {
        selectedTransactionsIds.add(jobId);
        selectedTransactionsSummaryValue += job.jobCost;
      }
    });

    this.setState({
      checked: selectedTransactionsIds.size === pendingTransactions.length,
      selectedTransactionsIds,
      selectedContractorsIds,
      selectedTransactionsSummaryValue,
    });
  };

  renderAmount = amount => formatUsd(amount);

  handleTypeChange = e => this.setState({ type: e.target.value });

  onSelectAll = e => {
    const { pendingTransactions } = this.props;

    let localState = {
      checked: e.target.checked,
      selectedTransactionsSummaryValue: 0,
      selectedTransactionsIds: new Set(),
      selectedContractorsIds: new Set(),
    };

    if (e.target.checked) {
      pendingTransactions.forEach(transaction => {
        localState.selectedTransactionsSummaryValue += transaction.jobCost;
        localState.selectedContractorsIds.add(transaction.contractor.id);
        localState.selectedTransactionsIds.add(transaction.id);
      });
    }

    this.setState(localState);
  };

  showPreviousSalary = contractorId => {
    const { previousTransactionsMap } = this.state;
    return previousTransactionsMap.get(contractorId)
      ? formatUsd(previousTransactionsMap.get(contractorId))
      : '$0';
  };

  showContractorName = (contractorName, record) => {
    return <Link to={'/contractors/' + record.contractorId}>{contractorName}</Link>;
  };

  renderJobsList = jobsList => {
    const { paidTransactions } = this.state;
    const { jobs } = this.props;

    return (
      <JobsList
        jobs={jobs}
        jobsList={jobsList}
        paidTransactions={paidTransactions}
        renderAmount={this.renderAmount}
      />
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
