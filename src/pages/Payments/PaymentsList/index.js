import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Checkbox, Spin } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Box from '~components/Box';
import Header from '~components/Header';
import BottomBar from '~components/BottomBar';
import Summary from './components/Summary';

import { getCurrentTwoWeeksPeriod } from '~utils/time';
import { formatUsd } from '~utils/number';
import { JobsList } from './components/JobsList';
import makeDefaultPagination from '~utils/pagination';

import './PaymentsList.css';

const { Column } = Table;

class Payments extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    paymentsListPagination: PropTypes.object,
    usersJobs: PropTypes.array,
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
    usersJobs: [],
    selectedTransactionsIds: new Set(),
    selectedContractorsIds: new Set(),
    selectedTransactionsSummaryValue: 0,
    pagination: makeDefaultPagination(),
    paymentsListPagination: null,
  };

  constructor(props) {
    super(props);

    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    const { pagination } = this.state;
    const { getTransactionsSummary, getUsersJobs } = this.props;
    getTransactionsSummary({
      status: 'new',
      ...getCurrentTwoWeeksPeriod(),
    });
    getUsersJobs({
      status: 'new',
      ...getCurrentTwoWeeksPeriod(),
      page: pagination.current,
      limit: pagination.pageSize,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
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

    if (nextProps.usersJobs !== prevState.usersJobs) {
      return {
        usersJobs: nextProps.usersJobs,
      };
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

  handleRefresh() {
    console.log('refresh');
    // const { getUsersWithTransactions, getTransactionsSummary } = this.props;
    // const { pagination } = this.state;
    // getTransactionsSummary({
    //   status: 'new',
    //   ...getCurrentTwoWeeksPeriod(),
    // });
    // getUsersWithTransactions({
    //   status: 'new',
    //   ...getCurrentTwoWeeksPeriod(),
    //   page: pagination.current,
    //   limit: pagination.pageSize,
    // });
    // getUsersWithTransactions({
    //   status: 'done',
    //   ...getPreviousTwoWeeksPeriod(),
    //   page: pagination.current,
    //   limit: pagination.pageSize,
    // });
  }

  handleTableChange = pag => {
    console.log('pag');
    // const { getUsersWithTransactions, getTransactionsSummary } = this.props;
    // const { pagination } = this.state;
    // let curr = pag.current;
    // if (pagination.pageSize !== pag.pageSize) {
    //   curr = 1;
    // }
    // this.setState({ pagination: { ...pag, current: curr } });
    // getTransactionsSummary({
    //   status: 'new',
    //   ...getCurrentTwoWeeksPeriod(),
    // });
    // getUsersWithTransactions({
    //   status: 'new',
    //   ...getCurrentTwoWeeksPeriod(),
    //   page: curr,
    //   limit: pag.pageSize,
    // });
    // getUsersWithTransactions({
    //   status: 'done',
    //   ...getPreviousTwoWeeksPeriod(),
    //   page: curr,
    //   limit: pag.pageSize,
    // });
  };

  render() {
    const {
      checked,
      previous,
      current,
      selectedTransactionsIds,
      usersJobs,
      selectedContractorsIds,
      selectedTransactionsSummaryValue,
      pagination,
    } = this.state;

    const { isLoading, loadingTransactions } = this.props;

    return (
      <div>
        <Header
          title="Payments"
          size="medium"
          refresh
          refreshLoading={loadingTransactions}
          handleRefresh={this.handleRefresh}
        />

        <Spin spinning={isLoading}>
          <Summary previous={previous} current={current} />
        </Spin>

        <div className="PaymentsList-selector">
          <Checkbox onChange={this.onSelectAll} checked={checked} /> Select All
        </div>

        <Box>
          <Table
            dataSource={usersJobs}
            className="PaymentsList-table"
            loading={loadingTransactions}
            pagination={pagination}
            onChange={this.handleTableChange}
            rowKey={record => record.id}
            expandedRowRender={record => <div>{this.renderJobsList(record)}</div>}>
            <Column
              align="center"
              dataIndex="rank"
              title="Rank"
              width="10%"
              className="PaymentsList-rank-selector"
            />
            <Column
              align="center"
              dataIndex="contractor"
              width="35%"
              title="Contractor"
              render={this.showContractorName}
              className="PaymentsList-contractor-selector"
            />
            <Column
              align="center"
              dataIndex="jobsCount"
              title="Num Jobs"
              width="15%"
              className="PaymentsList-numOfJobs-selector"
            />
            <Column
              align="center"
              className="PaymentsList-table-current PaymentsList-current-selector"
              dataIndex="total"
              render={this.renderAmount}
              width="15%"
              title="Current"
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
    const { selectedTransactionsIds, selectedContractorsIds, usersJobs } = this.state;

    const { updatePaymentsList } = this.props;

    let { selectedTransactionsSummaryValue } = this.state;
    const contractorId = user.id;

    if (selectedContractorsIds.has(contractorId)) {
      selectedContractorsIds.delete(contractorId);
    } else {
      selectedContractorsIds.add(contractorId);
    }

    user.transactionsIds.forEach(transaction => {
      const transactionId = transaction.id;

      if (selectedTransactionsIds.has(transaction)) {
        selectedTransactionsIds.delete(transaction);
        selectedTransactionsSummaryValue -= user.total;
      } else {
        selectedTransactionsIds.add(transactionId);
        selectedTransactionsSummaryValue += user.total;
      }
    });

    this.setState({
      checked: selectedTransactionsIds.size === usersJobs.length,
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
    console.log('select all');
    // const { usersPendingTransactions, updatePaymentsList } = this.props;
    //
    // let data = {
    //   selectedTransactionsSummaryValue: 0,
    //   selectedTransactionsIds: new Set(),
    //   selectedContractorsIds: new Set(),
    // };
    //
    // if (e.target.checked) {
    //   usersPendingTransactions.items.forEach(user => {
    //     data.selectedContractorsIds.add(user.id);
    //
    //     user.transactions.forEach(transaction => {
    //       data.selectedTransactionsSummaryValue += transaction.job.value * transaction.quantity;
    //       data.selectedTransactionsIds.add(transaction.id);
    //     });
    //   });
    // }
    //
    // this.setState({ checked: e.target.checked });
    //
    // updatePaymentsList({ ...data });
  };

  showContractorName = (val, user) => {
    if (user.contractor === ' ') {
      return <div>Profile doesn't exist</div>;
    }

    return (
      <Link to={'/contractors/' + user.id}>{user.contractor}</Link>
    );
  };

  renderJobsList = record => {
    return (
          <JobsList
    jobsList={record.jobs}
    userId={record.id}
    renderAmount={this.renderAmount}
    />
    );
  };
}

const mapStateToProps = state => ({
  transactionsSummary: state.transactions.transactionsSummary,
  paymentsListPagination: state.users.paymentsListPagination,
  usersJobs: state.users.usersJobs,
  selectedTransactionsIds: state.payments.selectedTransactionsIds,
  selectedContractorsIds: state.payments.selectedContractorsIds,
  selectedTransactionsSummaryValue: state.payments.selectedTransactionsSummaryValue,
  loadingTransactions: state.loading.effects.users.getUsersWithTransactions,
  isLoading: state.loading.effects.jobs.getJobs,
});

const mapDispatchToProps = dispatch => ({
  getUsersJobs: dispatch.users.getUsersJobs,
  updatePaymentsList: dispatch.payments.updatePaymentsList,
  getTransactionsSummary: dispatch.transactions.getTransactionsSummary,
});

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
