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
import { sumTransactions } from '~utils/summary';
import makeDefaultPagination from '~utils/pagination';

import './PaymentsList.css';

const { Column } = Table;

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

const calculateTransactions = usersTransactions => {
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
    isLoading: PropTypes.bool,
    paymentsListPagination: PropTypes.object,
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
    pagination: makeDefaultPagination(),
    paymentsListPagination: null,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.props.getJobs();
    this.props.getUsersWithTransactions({
      status: 'new',
      ...getCurrentTwoWeeksPeriod(),
      page: pagination.current,
      limit: pagination.pageSize,
    });
    this.props.getUsersWithTransactions({
      status: 'done',
      ...getPreviousTwoWeeksPeriod(),
      page: pagination.current,
      limit: pagination.pageSize,
    });
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

    if (nextProps.paymentsListPagination !== prevState.paymentsListPagination) {
      let pag = prevState.pagination;
      return {
        paymentsListPagination: nextProps.paymentsListPagination,
        pagination: { ...pag, total: nextProps.paymentsListPagination.total },
      };
    }
    return null;
  }

  handleTableChange = pagination => {
    const { getUsersWithTransactions } = this.props;
    this.setState({ pagination });
    getUsersWithTransactions({
      status: 'new',
      ...getCurrentTwoWeeksPeriod(),
      page: pagination.current,
      limit: pagination.pageSize,
    });
    getUsersWithTransactions({
      status: 'done',
      ...getPreviousTwoWeeksPeriod(),
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  render() {
    const {
      checked,
      previous,
      current,
      calculatedCurrentTransactions,
      selectedTransactionsIds,
      selectedContractorsIds,
      selectedTransactionsSummaryValue,
      pagination,
    } = this.state;

    const { isLoading } = this.props;

    return (
      <div>
        <Header title="Payments" size="medium" />

        <Summary previous={previous} current={current} />

        <div className="PaymentsList-selector">
          <Checkbox onChange={this.onSelectAll} checked={checked} /> Select All
        </div>

        <Box>
          <Table
            dataSource={calculatedCurrentTransactions}
            bordered
            className="PaymentsList-table"
            loading={isLoading}
            pagination={pagination}
            onChange={this.handleTableChange}
            expandedRowRender={record => <div>{this.renderJobsList(record.transactions)}</div>}>
            <Column
              align="center"
              dataIndex="key"
              title="Rank"
              width="10%"
              className="PaymentsList-rank-selector"
            />
            <Column
              align="center"
              dataIndex="contractor"
              width="25%"
              title={<TitleWithIcon title="Contractor" icon="user" />}
              render={this.showContractorName}
              className="PaymentsList-contractor-selector"
            />
            <Column
              align="center"
              dataIndex="numOfJobs"
              title="Num Jobs"
              width="10%"
              className="PaymentsList-numOfJobs-selector"
            />
            <Column
              align="center"
              dataIndex="contractorId"
              render={this.showPreviousSalary}
              title="Prev"
              width="15%"
              className="PaymentsList-prev-selector"
            />
            <Column
              align="center"
              className="PaymentsList-table-current PaymentsList-current-selector"
              dataIndex="transactionsSum"
              render={this.renderAmount}
              width="15%"
              title={<TitleWithIcon title="Current" icon="dollar" />}
            />
            <Column
              className="PaymentsList-table-approve PaymentsList-approve-selector"
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
          onSubmit={this.handlePay}
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
      const transactionId = transaction.id;

      if (selectedTransactionsIds.has(transactionId)) {
        selectedTransactionsIds.delete(transactionId);
        selectedTransactionsSummaryValue -= +transaction.value * transaction.quantity;
      } else {
        selectedTransactionsIds.add(transactionId);
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

  handlePay = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/confirmation`);
  };

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

  showContractorName = (val, user) => {
    if (!user.profile) {
      return <div>Profile doesn't exist</div>;
    }

    return (
      <Link to={'/contractors/' + user.id}>{`${user.profile.firstName} ${
        user.profile.lastName
      }`}</Link>
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
  isLoading: state.loading.effects.jobs.getJobs,
  paymentsListPagination: state.users.paymentsListPagination,
});

const mapDispatchToProps = dispatch => ({
  getJobs: dispatch.jobs.getJobs,
  getUsersWithTransactions: dispatch.users.getUsersWithTransactions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
