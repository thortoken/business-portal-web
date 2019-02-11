import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Spin, Tooltip, Input, Radio } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Box from '~components/Box';
import Header from '~components/Header';
import BottomBar from '~components/BottomBar';
import Summary from './components/Summary';
import TooltipButton from '~components/TooltipButton';
import { formatUsd } from '~utils/number';
import { JobsList } from './components/JobsList';
import makeDefaultPagination from '~utils/pagination';

import RefreshButton from '~components/RefreshButton';

import './PaymentsList.scss';
import { AddPaymentModal } from '~pages/Payments/components/AddPaymentModal';

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
    selectAll: false,
    previous: {
      total: 0,
      users: 0,
    },
    current: {
      total: 0,
      users: 0,
    },
    usersJobs: [],
    selectedTransactionsIds: new Set(),
    selectedContractorsIds: new Set(),
    selectedTransactionsSummaryValue: 0,
    paymentsListPagination: null,
    selectedTransactionGroups: [],
    resetTransactions: false,
    isAddPaymentModalVisible: false,
    selectedUserId: '',
    pagination: makeDefaultPagination(),
    filters: {
      status: undefined,
      name: undefined,
    },
    sorters: {
      orderBy: undefined,
      order: undefined,
    },
    searchText: null,
    statusFilter: null,
  };

  componentDidMount() {
    const { resetTransactions } = this.state;
    const { reset, getJobs } = this.props;
    this.updateTable(this.state);
    if (resetTransactions) {
      reset();
    }

    // TODO: do this when they click the 'add payment' button
    getJobs({
      page: 1,
      limit: 200,
      isActive: true,
      isCustom: false,
    });
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
      localState['paymentsListPagination'] = nextProps.paymentsListPagination;
      localState['pagination'] = {
        ...prevState.pagination,
        total: nextProps.paymentsListPagination.total,
      };
    }

    if (nextProps.jobsList !== prevState.jobsList) {
      localState['jobsList'] = nextProps.jobsList;
    }

    return Object.keys(localState).length ? localState : null;
  }

  handleRefresh = () => {
    this.updateTable(this.state);
  };

  updateTable({ filters, sorters, pagination }) {
    const { getUsersJobs, getTransactionsSummary } = this.props;

    this.setState({
      pagination,
      filters,
      sorters,
    });

    getTransactionsSummary({
      ...filters,
      page: pagination.current,
      limit: pagination.pageSize,
    });
    getUsersJobs({
      ...filters,
      ...sorters,
      page: pagination.current,
      limit: pagination.pageSize,
    });
  }

  handleTableChange = (p, f, s) => {
    let { pagination, filters, sorters } = this.state;

    pagination = {
      ...pagination,
      pageSize: p.pageSize,
      current: p.current,
    };
    filters = {
      ...filters,
    };
    sorters = {
      ...sorters,
      orderBy: s.columnKey || undefined,
      order: s.order || undefined,
    };

    this.updateTable({ filters, sorters, pagination });
  };

  handleOnDatesChanged = ({ startDate, endDate }) => {
    const { filters, sorters, pagination } = this.state;
    filters.startDate = startDate;
    filters.endDate = endDate;
    this.updateTable({ filters, sorters, pagination });
  };

  handleStatusFilterChange = e => {
    const { value } = e.target;
    const { filters, sorters, pagination } = this.state;

    filters.status = value === 'all' ? undefined : value;
    this.updateTable({ filters, sorters, pagination });
  };

  handleSearch = (text, confirm) => {
    const { pagination, sorters, filters } = this.state;
    pagination.current = 1;
    filters.name = text;

    this.updateTable({ pagination, filters, sorters });
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
      selectAll,
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
          <Radio.Group
            value={this.state.filters.status || 'all'}
            onChange={this.handleStatusFilterChange}>
            <Radio.Button value="new">New</Radio.Button>
            <Radio.Button value="pending">Pending</Radio.Button>
            <Radio.Button value="all">All</Radio.Button>
          </Radio.Group>
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isJobsLoading} />
        </Header>

        <Spin spinning={isSummaryLoading}>
          <Summary
            previous={previous}
            current={current}
            startDate={this.state.filters.startDate}
            endDate={this.state.filters.endDate}
            onDatesChanged={this.handleOnDatesChanged}
          />
        </Spin>

        <AddPaymentModal
          jobsList={this.state.jobsList}
          userId={this.state.selectedUserId}
          addExistingTransaction={this.props.addExistingTransaction}
          addCustomTransaction={this.props.addCustomTransaction}
          isModalVisible={this.state.isAddPaymentModalVisible}
          onChangeVisibility={this.onChangeVisibility}
          handleRefresh={this.handleRefresh}
          isLoading={this.props.isJobsListLoading}
        />

        <Box>
          <Table
            locale={{
              emptyText: <div>No Payments</div>,
            }}
            dataSource={usersJobs}
            className="PaymentsList-table"
            loading={isJobsLoading}
            pagination={pagination}
            onChange={this.handleTableChange}
            rowKey={record => record.id}
            expandRowByClick
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
              dataIndex="name"
              width="35%"
              title="Contractor"
              render={this.showContractorName}
              className="PaymentsList-name-selector"
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
                return (
                  <TooltipButton
                    placement="top"
                    tooltip="Add a payment"
                    onClick={event => {
                      event.stopPropagation();
                      this.handleAddPaymentClick(record);
                    }}>
                    <Icon type="plus" theme="outlined" />
                  </TooltipButton>
                );
              }}
            />
            <Column
              className="PaymentsList-table-approve PaymentsList-approve-selector"
              title={() => {
                return (
                  <button
                    className={classnames(null, {
                      active: selectAll,
                    })}
                    onClick={this.onSelectAll}>
                    <Tooltip title="Approve All">
                      <Icon type="check" />
                    </Tooltip>
                  </button>
                );
              }}
              dataIndex="jobs"
              align="center"
              width="15%"
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
      selectAll: selectedTransactionsIds.size === usersJobs.length,
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
          onClick={event => {
            event.stopPropagation();
            this.handleSelectTransaction(record);
          }}>
          <Icon type="check" />
        </button>
      );
    }
  };

  onChangeVisibility = (isAddPaymentModalVisible, refreshData = false) => {
    if (refreshData) {
      this.handleRefresh();
    }

    this.setState({ isAddPaymentModalVisible });
  };

  renderAmount = amount => formatUsd(amount);

  handleTypeChange = e => this.setState({ type: e.target.value });

  handlePay = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/confirmation`);
  };

  onSelectAll = () => {
    const { usersJobs, updatePaymentsList } = this.props;
    let data = {
      selectedTransactionsSummaryValue: 0,
      selectedTransactionsIds: new Set(),
      selectedContractorsIds: new Set(),
      selectedTransactionGroups: [],
    };

    const selectAll = !this.state.selectAll;

    if (selectAll) {
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

    this.setState({ selectAll });
    updatePaymentsList({ ...data });
  };

  showContractorName = (val, user) => {
    if (user.name === ' ') {
      return <div>Profile doesn't exist</div>;
    }

    return <Link to={'/contractors/' + user.id}>{user.name}</Link>;
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
  isJobsListLoading: state.loading.effects.jobs.getJobs,
  jobsList: state.jobs.jobsList,
});

const mapDispatchToProps = dispatch => ({
  getUsersJobs: dispatch.users.getUsersJobs,
  updatePaymentsList: dispatch.payments.updatePaymentsList,
  getTransactionsSummary: dispatch.transactions.getTransactionsSummary,
  createTransaction: dispatch.transactions.createTransaction,
  deleteTransaction: dispatch.transactions.deleteTransaction,
  addExistingTransaction: dispatch.transactions.addExistingTransaction,
  addCustomTransaction: dispatch.transactions.addCustomTransaction,
  getJobs: dispatch.jobs.getJobs,
  reset: dispatch.payments.reset,
});

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
