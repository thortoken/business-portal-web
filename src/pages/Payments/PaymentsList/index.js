import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Checkbox, Spin } from 'antd';
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
    selectedTransactionsSummaryValue: PropTypes.number,
    selectedTransactionsIds: PropTypes.object,
    selectedContractorsIds: PropTypes.object,
  };

  state = {
    checked: false,
    previous: {
      total: '',
      users: '',
      startDate: '',
      endDate: '',
    },
    current: {
      total: '',
      users: '',
      startDate: '',
      endDate: '',
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
    this.props.getTransactionsSummary({
      status: 'new',
      ...getCurrentTwoWeeksPeriod(),
    });
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

    if (
      nextProps.transactionsSummary &&
      (nextProps.transactionsSummary.previous !== prevState.previous ||
        nextProps.transactionsSummary.current !== prevState.current)
    ) {
      const { previous, current } = nextProps.transactionsSummary;
      return {
        previous,
        current,
      };
    }

    if (nextProps.usersPendingTransactions !== prevState.usersPendingTransactions) {
      const objState = {
        usersPendingTransactions: nextProps.usersPendingTransactions,
      };

      if (hasJobs) {
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

    if (nextProps.selectedContractorsIds.size !== prevState.selectedContractorsIds.size) {
      return {
        selectedContractorsIds: nextProps.selectedContractorsIds,
      };
    }

    if (nextProps.selectedTransactionsIds.size !== prevState.selectedTransactionsIds.size) {
      return {
        selectedTransactionsIds: nextProps.selectedTransactionsIds,
      };
    }

    if (nextProps.selectedTransactionsSummaryValue !== prevState.selectedTransactionsSummaryValue) {
      return {
        selectedTransactionsSummaryValue: nextProps.selectedTransactionsSummaryValue,
      };
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

  handleTableChange = pag => {
    const { getUsersWithTransactions } = this.props;
    const { pagination } = this.state;
    if (pagination.pageSize !== pag.pageSize) {
      this.setState({ pagination: { ...pag, current: 1 } });
    } else {
      this.setState({ pagination: pag });
    }
    getUsersWithTransactions({
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

        <Spin spinning={isLoading}>
          <Summary previous={previous} current={current} />
        </Spin>

        <div className="PaymentsList-selector">
          <Checkbox onChange={this.onSelectAll} checked={checked} /> Select All
        </div>

        <Box>
          <Table
            dataSource={calculatedCurrentTransactions}
            className="PaymentsList-table"
            loading={isLoading}
            pagination={pagination}
            onChange={this.handleTableChange}
            rowKey={record => record.id}
            expandedRowRender={record => <div>{this.renderJobsList(record)}</div>}>
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

    const { updatePaymentsList } = this.props;

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
        selectedTransactionsSummaryValue -= +transaction.job.value * transaction.quantity;
      } else {
        selectedTransactionsIds.add(transactionId);
        selectedTransactionsSummaryValue += +transaction.job.value * transaction.quantity;
      }
    });

    this.setState({
      checked: selectedTransactionsIds.size === usersPendingTransactions.length,
    });

    updatePaymentsList({
      selectedContractorsIds,
      selectedTransactionsIds,
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
    const { usersPendingTransactions, updatePaymentsList } = this.props;

    let data = {
      selectedTransactionsSummaryValue: 0,
      selectedTransactionsIds: new Set(),
      selectedContractorsIds: new Set(),
    };

    if (e.target.checked) {
      usersPendingTransactions.items.forEach(user => {
        data.selectedContractorsIds.add(user.id);

        user.transactions.forEach(transaction => {
          data.selectedTransactionsSummaryValue += transaction.job.value * transaction.quantity;
          data.selectedTransactionsIds.add(transaction.id);
        });
      });
    }

    this.setState({ checked: e.target.checked });

    updatePaymentsList({ ...data });
  };

  showPreviousSalary = contractorId => {
    const { previousTransactionsMap } = this.state;
    return previousTransactionsMap.get(contractorId)
      ? formatUsd(previousTransactionsMap.get(contractorId))
      : '$0';
  };

  showContractorName = (val, user) => {
    if (!user.tenantProfile) {
      return <div>Profile doesn't exist</div>;
    }

    return (
      <Link to={'/contractors/' + user.id}>{`${user.tenantProfile.firstName} ${
        user.tenantProfile.lastName
      }`}</Link>
    );
  };

  renderJobsList = record => {
    const { usersPaidTransactions } = this.state;
    const { jobs } = this.props;

    return (
      <JobsList
        jobs={jobs}
        jobsList={record.transactions}
        userId={record.id}
        usersPaidTransactions={usersPaidTransactions}
        renderAmount={this.renderAmount}
      />
    );
  };
}

const mapStateToProps = state => ({
  usersPaidTransactions: state.users.usersPaidTransactions,
  usersPendingTransactions: state.users.usersPendingTransactions,
  transactionsSummary: state.transactions.transactionsSummary,
  jobs: state.jobs.jobs,
  isLoading: state.loading.effects.jobs.getJobs,
  paymentsListPagination: state.users.paymentsListPagination,
  selectedTransactionsIds: state.payments.selectedTransactionsIds,
  selectedContractorsIds: state.payments.selectedContractorsIds,
  selectedTransactionsSummaryValue: state.payments.selectedTransactionsSummaryValue,
});

const mapDispatchToProps = dispatch => ({
  getJobs: dispatch.jobs.getJobs,
  getUsersWithTransactions: dispatch.users.getUsersWithTransactions,
  updatePaymentsList: dispatch.payments.updatePaymentsList,
  getTransactionsSummary: dispatch.transactions.getTransactionsSummary,
});

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
