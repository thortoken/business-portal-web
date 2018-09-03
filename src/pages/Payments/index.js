import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import classnames from 'classnames';

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

const sumTransactions = transactions => {
  return transactions.reduce((prevValue, currValue) => {
    return +prevValue + currValue.value * currValue.quantity;
  }, 0);
};

const calculateSummaryTransactions = (transactions, period) => {
  const datesForPeriod =
    period === 'prev' ? getPreviousTwoWeeksPeriod() : getCurrentTwoWeeksPeriod();
  const obj = { ...datesForPeriod };
  obj.contractorsCount = transactions.length;
  obj.value = transactions.reduce((prevValue, currValue) => {
    return prevValue + sumTransactions(currValue.transactions);
  }, 0);

  return obj;
};

const calculateTransactions = (usersTransactions, jobs) => {
  return _.sortBy(
    usersTransactions.map(user => {
      return {
        ...user,
        numOfJobs: user.transactions.length,
        transactionsSum: sumTransactions(user.transactions),
      };
    }),
    'transactionsSum'
  )
    .reverse()
    .map((contractor, index) => ({ ...contractor, key: index + 1 }));
};

class Payments extends React.Component {
  static propTypes = {
    usersPaidTransactions: PropTypes.object,
    usersPendingTransactions: PropTypes.object,
    jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
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
    usersPendingTransactions: [],
    selectedTransactionsIds: new Set(),
    selectedContractorsIds: new Set(),
    selectedTransactionsSummaryValue: 0,
  };

  componentDidMount() {
    this.props.getJobs();
    this.props.getUsersWithTransactions({ status: 'new', ...getCurrentTwoWeeksPeriod() });
    this.props.getUsersWithTransactions({ status: 'done', ...getPreviousTwoWeeksPeriod() });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const hasJobs = Object.keys(nextProps.jobs).length > 0;

    if (nextProps.usersPendingTransactions !== prevState.usersPendingTransactions) {
      const objState = {
        usersPendingTransactions: nextProps.usersPendingTransactions,
      };

      if (hasJobs) {
        objState.current = calculateSummaryTransactions(
          nextProps.usersPendingTransactions.items,
          'curr'
        );
        objState.calculatedCurrentTransactions = calculateTransactions(
          nextProps.usersPendingTransactions.items,
          nextProps.jobs
        );
      }

      return objState;
    }

    if (nextProps.usersPaidTransactions !== prevState.usersPaidTransactions) {
      const objState = {
        usersPaidTransactions: nextProps.usersPaidTransactions,
      };
      if (hasJobs) {
        objState.previous = calculateSummaryTransactions(
          nextProps.usersPaidTransactions ? nextProps.usersPaidTransactions.items : [],
          'prev'
        );
        objState.calculatedPreviousTransactions = calculateTransactions(
          nextProps.usersPaidTransactions ? nextProps.usersPaidTransactions.items : [],
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
        <Header title="Payments" size="medium"/>

        <Summary previous={previous} current={current}/>

        <div className="Payments-selector">
          <Checkbox onChange={this.onSelectAll} checked={checked}/> Select All
        </div>

        <Box>
          <Table
            dataSource={calculatedCurrentTransactions}
            bordered
            className="Payments-table"
            expandedRowRender={record => <div>{this.renderJobsList(record.transactions)}</div>}>
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
              title={<TitleWithIcon title="Contractor" icon="user"/>}
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
              dataIndex="transactionsSum"
              render={this.renderAmount}
              width="15%"
              title={<TitleWithIcon title="Current" icon="dollar"/>}
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
                  <Icon type="check"/>
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
    return selectedContractorsIds.has(record.id);
  };

  handleSelectTransaction = user => {
    const {
      selectedTransactionsIds,
      selectedContractorsIds,
      usersPendingTransactions,
    } = this.state;
    let { selectedTransactionsSummaryValue } = this.state;
    const contractorId = user.id;

    if (selectedContractorsIds.has(contractorId)) {
      selectedContractorsIds.delete(contractorId);
    } else {
      selectedContractorsIds.add(contractorId);
    }

    user.transactions.forEach(transaction => {
      const jobId = transaction.id;

      if (selectedTransactionsIds.has(jobId)) {
        selectedTransactionsIds.delete(jobId);
        selectedTransactionsSummaryValue -= +transaction.value * transaction.quantity;
      } else {
        selectedTransactionsIds.add(jobId);
        selectedTransactionsSummaryValue += +transaction.value * transaction.quantity;
      }
    });

    this.setState({
      checked: selectedTransactionsIds.size === usersPendingTransactions.length,
      selectedTransactionsIds,
      selectedContractorsIds,
      selectedTransactionsSummaryValue,
    });
  };

  renderAmount = amount => formatUsd(amount);

  handleTypeChange = e => this.setState({ type: e.target.value });

  onSelectAll = e => {
    const { usersPendingTransactions } = this.props;

    let localState = {
      checked: e.target.checked,
      selectedTransactionsSummaryValue: 0,
      selectedTransactionsIds: new Set(),
      selectedContractorsIds: new Set(),
    };

    if (e.target.checked) {
      usersPendingTransactions.items.forEach(user => {
        localState.selectedContractorsIds.add(user.id);

        user.transactions.forEach(transaction => {
          localState.selectedTransactionsSummaryValue += transaction.value * transaction.quantity;
          localState.selectedTransactionsIds.add(transaction.id);
        });
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
    if (record.profile === null) {
      record.profile = {
        firstName: '',
        lastName: ''
      }
    }
    return (
      <Link to={'/contractors/' + record.id}>
        {`${record.profile.firstName} ${record.profile.lastName}`}
      </Link>
    );
  };

  renderJobsList = jobsList => {
    const { usersPaidTransactions } = this.state;
    const { jobs } = this.props;

    return (
      <JobsList
        jobs={jobs}
        jobsList={jobsList}
        usersPaidTransactions={usersPaidTransactions}
        renderAmount={this.renderAmount}
      />
    );
  };
}

const mapStateToProps = state => ({
  usersPaidTransactions: state.users.usersPaidTransactions,
  usersPendingTransactions: state.users.usersPendingTransactions,
  jobs: state.jobs.jobs,
});

const mapDispatchToProps = dispatch => ({
  getJobs: dispatch.jobs.getJobs,
  getUsersWithTransactions: dispatch.users.getUsersWithTransactions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
