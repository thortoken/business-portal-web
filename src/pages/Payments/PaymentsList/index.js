import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Spin, Input, Switch } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import moment from 'moment';

import Box from '~components/Box';
import Header from '~components/Header';
import BottomBar from '~components/BottomBar';
import Summary from './components/Summary';

import { getCurrentTwoWeeksPeriod } from '~utils/time';
import { formatUsd } from '~utils/number';
import { JobsList } from './components/JobsList';
import makeDefaultPagination from '~utils/pagination';

import RefreshButton from '~components/RefreshButton';

import './PaymentsList.scss';
import AddTransactionMenu from '../../Transactions/AddTransactionMenu';

const { Column } = Table;
const Search = Input.Search;

class Payments extends React.Component {
  static propTypes = {
    isSummaryLoading: PropTypes.bool,
    isJobsLoading: PropTypes.bool,
    paymentsListPagination: PropTypes.object,
    usersJobs: PropTypes.array,
    selectedTransactionGroups: PropTypes.array,
    selectedTransactionsSummaryValue: PropTypes.number,
    selectedTransactionsIds: PropTypes.object,
    selectedContractorsIds: PropTypes.object,
    resetTransactions: PropTypes.bool,
  };

  state = {
    checked: false,
    previous: {
      total: 0,
      users: 0,
      startDate: '',
      endDate: '',
    },
    current: {
      total: 0,
      users: 0,
      startDate: '',
      endDate: '',
    },
    usersJobs: [],
    selectedTransactionsIds: new Set(),
    selectedContractorsIds: new Set(),
    selectedTransactionsSummaryValue: 0,
    pagination: makeDefaultPagination(),
    paymentsListPagination: null,
    selectedTransactionGroups: [],
    resetTransactions: false,
    isAddPaymentModalVisible: false,
    selectedUserId: '',
    filters: {},
    sorters: {},
    searchText: null,
  };

  componentDidMount() {
    const { resetTransactions, pagination } = this.state;
    const { reset } = this.props;
    this.updateTable({
      current: pagination.current,
      limit: pagination.pageSize,
    });
    if (resetTransactions) {
      reset();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let localState = {};
    if (
      nextProps.transactionsSummary &&
      (nextProps.transactionsSummary.previous !== prevState.previous ||
        nextProps.transactionsSummary.current !== prevState.current)
    ) {
      const { previous, current } = nextProps.transactionsSummary;
      localState['previous'] = { ...previous };
      localState['current'] = { ...current };
    }

    if (nextProps.usersJobs !== prevState.usersJobs) {
      localState['usersJobs'] = nextProps.usersJobs;
    }

    if (nextProps.resetTransactions !== prevState.resetTransactions) {
      localState['resetTransactions'] = nextProps.resetTransactions;
    }

    if (nextProps.selectedContractorsIds.size !== prevState.selectedContractorsIds.size) {
      localState['selectedContractorsIds'] = nextProps.selectedContractorsIds;
    }

    if (nextProps.selectedTransactionsIds.size !== prevState.selectedTransactionsIds.size) {
      localState['selectedTransactionsIds'] = nextProps.selectedTransactionsIds;
    }

    if (nextProps.selectedTransactionGroups.length !== prevState.selectedTransactionGroups.length) {
      localState['selectedTransactionGroups'] = nextProps.selectedTransactionGroups;
    }

    if (nextProps.selectedTransactionsSummaryValue !== prevState.selectedTransactionsSummaryValue) {
      localState['selectedTransactionsSummaryValue'] = nextProps.selectedTransactionsSummaryValue;
    }

    if (nextProps.paymentsListPagination !== prevState.paymentsListPagination) {
      let pag = prevState.pagination;
      localState['paymentsListPagination'] = nextProps.paymentsListPagination;
      localState['pagination'] = {
        ...pag,
        total: nextProps.paymentsListPagination.total,
      };
    }
    return Object.keys(localState).length ? localState : null;
  }

  handleRefresh = () => {
    const { pagination } = this.state;
    this.updateTable({
      current: pagination.current,
      limit: pagination.pageSize,
    });
  };

  updateTable(config) {
    const { getUsersJobs, getTransactionsSummary } = this.props;
    getTransactionsSummary({
      status: config.status || 'new',
      ...getCurrentTwoWeeksPeriod(),
    });
    getUsersJobs({
      ...getCurrentTwoWeeksPeriod(),
      page: config.current,
      limit: config.limit,
      status: config.status || undefined,
      orderBy: config.orderBy || undefined,
      order: config.order || undefined,
      contractor: config.searchText || undefined,
    });
  }

  handleTableChange = (pag, filters, sorters) => {
    const { pagination, searchText } = this.state;
    let curr = pag.current;
    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }
    this.setState({ pagination: { ...pag, current: curr }, filters, sorters });

    this.updateTable({
      current: curr,
      limit: pag.pageSize,
      status: filters && filters.jobs ? filters.jobs[0] : undefined,
      orderBy: sorters.columnKey || undefined,
      order: sorters.order || undefined,
      searchText: searchText || undefined,
    });
  };

  handleSearch = (text, confirm) => {
    const { pagination, filters, sorters } = this.state;

    this.setState({ pagination: { ...pagination, current: 1 }, searchText: text });

    this.updateTable({
      current: 1,
      limit: pagination.pageSize,
      status: filters && filters.jobs ? filters.jobs[0] : undefined,
      orderBy: sorters.columnKey || undefined,
      order: sorters.order || undefined,
      searchText: text || undefined,
    });
    confirm();
  };

  onSearch = e => {
    this.setState({ searchText: e.target.value });
  };

  clearSearch = clearFilters => {
    this.setState({ searchText: null });
    this.handleSearch(null, clearFilters);
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
      searchText,
    } = this.state;

    const { isSummaryLoading, isJobsLoading } = this.props;

    return (
      <div>
        <Header title="Payments List" size="medium">
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isJobsLoading} />
        </Header>

        <Spin spinning={isSummaryLoading}>
          <Summary
            previous={previous}
            current={current}
            onDatesChanged={this.handleOnDatesChanged}
          />
        </Spin>

        <div className="PaymentsList__additional-box">
          <div className="PaymentsList__additional-box--left PaymentsList__additional-box--box" />
          <div className="PaymentsList__additional-box--right PaymentsList__additional-box--box">
            <Switch
              onChange={this.onSelectAll}
              checkedChildren="Approve all on the page"
              unCheckedChildren="Approve all on the page"
              checked={checked}
            />
          </div>
        </div>
        <Box>
          <Table
            dataSource={usersJobs}
            className="PaymentsList-table"
            loading={isJobsLoading}
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
              sorter
            />
            <Column
              align="center"
              dataIndex="contractor"
              width="35%"
              title="Contractor"
              render={this.showContractorName}
              className="PaymentsList-contractor-selector"
              filterDropdown={({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                const prefix = searchText ? (
                  <Icon
                    type="close-circle"
                    key={'searchText'}
                    onClick={() => {
                      this.clearSearch(clearFilters);
                    }}
                  />
                ) : null;
                return (
                  <div className="PaymentsList__search-dropdown">
                    <Search
                      prefix={prefix}
                      className="PaymentsList__additional-box--search"
                      placeholder="Find Contractor"
                      onChange={this.onSearch}
                      value={searchText}
                      onSearch={value => this.handleSearch(value, confirm)}
                      enterButton
                    />
                  </div>
                );
              }}
              filterIcon={filtered => <Icon type="search" />}
            />
            <Column
              align="center"
              dataIndex="jobsCount"
              title="Jobs"
              width="10%"
              className="PaymentsList-numOfJobs-selector"
            />
            <Column
              align="center"
              className="PaymentsList-table-current PaymentsList-current-selector"
              dataIndex="total"
              render={this.renderAmount}
              width="15%"
              title="Current"
              sorter
            />
            <Column
              align="center"
              title="Actions"
              width="15%"
              render={(text, record) => {
                return <AddTransactionMenu type={'default'} userId={record.id} />;
              }}
            />
            <Column
              className="PaymentsList-table-approve PaymentsList-approve-selector"
              title="Approve"
              dataIndex="jobs"
              align="center"
              width="15%"
              filters={[
                {
                  text: 'New',
                  value: 'new',
                },
                {
                  text: 'Processed',
                  value: 'processed',
                },
                {
                  text: 'Failed',
                  value: 'failed',
                },
              ]}
              filterMultiple={false}
              render={(text, record) => this.renderStatusColumn(record)}
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
      selectedTransactionGroups,
      usersJobs,
    } = this.state;
    const { updatePaymentsList } = this.props;

    let { selectedTransactionsSummaryValue } = this.state;
    const contractorId = user.id;
    let transactionIds = [];

    if (selectedContractorsIds.has(contractorId)) {
      selectedContractorsIds.delete(contractorId);
      user.jobs.forEach(job => {
        if (job.status === 'new') {
          transactionIds.push(job.id);
          selectedTransactionsSummaryValue -= parseFloat(job.total);
        }
      });
      for (let i = 0; i < selectedTransactionGroups.length; i++) {
        if (selectedTransactionGroups[i].userId === user.id) {
          selectedTransactionGroups.splice(i, 1);
          break;
        }
      }
    } else {
      selectedContractorsIds.add(contractorId);
      user.jobs.forEach(job => {
        if (job.status === 'new') {
          transactionIds.push(job.id);
          selectedTransactionsSummaryValue += parseFloat(job.total);
        }
      });
      selectedTransactionGroups.push({
        userId: user.id,
        transactionsIds: transactionIds,
      });
    }

    transactionIds.forEach(transaction => {
      if (selectedTransactionsIds.has(transaction)) {
        selectedTransactionsIds.delete(transaction);
      } else {
        selectedTransactionsIds.add(transaction);
      }
    });

    this.setState({
      checked: selectedTransactionsIds.size === usersJobs.length,
    });

    updatePaymentsList({
      selectedContractorsIds,
      selectedTransactionsIds,
      selectedTransactionsSummaryValue,
      selectedTransactionGroups,
    });
  };

  handleAddPaymentClick = record => {
    this.setState({
      selectedUserId: record.id,
      isAddPaymentModalVisible: true,
    });
  };

  renderStatusColumn = record => {
    let newTransactions = record.jobs.filter(entry => {
      return entry.status === 'new';
    });
    let total = 0;
    if (record.jobs.length > 0) {
      total = newTransactions.reduce((prev, curr) => {
        return prev + curr.total;
      }, 0);
    }
    if (newTransactions.length > 0 && total < 10000) {
      return (
        <button
          className={classnames(null, {
            active: this.isActive(record),
          })}
          onClick={() => this.handleSelectTransaction(record)}>
          <Icon type="check" />
        </button>
      );
    }
  };

  onChangeVisibility = (isAddPaymentModalVisible, refreshData = false) => {
    this.setState({ isAddPaymentModalVisible });
  };

  renderAmount = amount => formatUsd(amount);

  handleTypeChange = e => this.setState({ type: e.target.value });

  handlePay = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/confirmation`);
  };

  onSelectAll = e => {
    const { usersJobs, updatePaymentsList } = this.props;
    let data = {
      selectedTransactionsSummaryValue: 0,
      selectedTransactionsIds: new Set(),
      selectedContractorsIds: new Set(),
      selectedTransactionGroups: [],
    };

    if (e) {
      usersJobs.forEach(user => {
        let selected = false;
        let total = user.jobs
          .filter(entry => {
            return entry.status === 'new';
          })
          .reduce((prev, curr) => {
            return prev + curr.total;
          }, 0);
        if (total < 10000) {
          user.jobs.forEach(job => {
            if (job.status === 'new') {
              data.selectedTransactionsIds.add(job.id);
              data.selectedTransactionsSummaryValue += parseFloat(job.total);
              selected = true;
            }
          });
        }

        if (selected) {
          data.selectedContractorsIds.add(user.id);
          data.selectedTransactionGroups.push({
            userId: user.id,
            transactionsIds: user.transactionsIds,
          });
        }
      });
    }

    this.setState({ checked: e });

    updatePaymentsList({ ...data });
  };

  showContractorName = (val, user) => {
    if (user.contractor === ' ') {
      return <div>Profile doesn't exist</div>;
    }

    return <Link to={'/contractors/' + user.id}>{user.contractor}</Link>;
  };

  renderJobsList = record => {
    const { createTransaction, deleteTransaction, history } = this.props;
    return (
      <JobsList
        jobsList={record.jobs}
        userId={record.id}
        history={history}
        renderAmount={this.renderAmount}
        handleRefresh={this.handleRefresh}
        createTransaction={createTransaction}
        deleteTransaction={deleteTransaction}
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
  selectedTransactionGroups: state.payments.selectedTransactionGroups,
  resetTransactions: state.payments.resetTransactions,
  selectedTransactionsSummaryValue: state.payments.selectedTransactionsSummaryValue,
  isSummaryLoading: state.loading.effects.transactions.getTransactionsSummary,
  isJobsLoading: state.loading.effects.users.getUsersJobs,
});

const mapDispatchToProps = dispatch => ({
  getUsersJobs: dispatch.users.getUsersJobs,
  updatePaymentsList: dispatch.payments.updatePaymentsList,
  getTransactionsSummary: dispatch.transactions.getTransactionsSummary,
  createTransaction: dispatch.transactions.createTransaction,
  deleteTransaction: dispatch.transactions.deleteTransaction,
  reset: dispatch.payments.reset,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payments);
