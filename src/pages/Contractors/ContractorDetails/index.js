import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Spin, Modal } from 'antd';
import { connect } from 'react-redux';

import Dropdown from '~components/Dropdown';
import BackBtn from '~components/BackBtn';
import ContractorSummary from './components/ContractorSummary';
import Filters from './components/Filters';
import Profile from './components/Profile';
import { AddTransactionModal } from '../../Payments/components/AddTransactionModal';

import { formatUsd } from '~utils/number';
import { movePeriod, renderShortDate } from '~utils/time';
import makeDefaultPagination from '~utils/pagination';

import './ContractorDetails.css';

const { Column } = Table;

const generateMenuItems = list => {
  return list.map(element => {
    return {
      key: element.key,
      value: (
        <div onClick={element.action}>
          <span>{element.label}</span>
        </div>
      ),
      className: element.className || '',
    };
  });
};

class ContractorDetails extends React.Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    getTransactionsForContractor: PropTypes.func.isRequired,
    transactionsListPagination: PropTypes.object,
  };

  state = {
    isModalVisible: false,
    currentUser: {},
    periodRange: null,
    pagination: makeDefaultPagination(),
    transactionsListPagination: null,
    currentUserStatistics: {
      rank: 0,
      nJobs: 0,
      prev: 0,
      current: 0,
      ytd: 0,
    },
    contractorTransactions: {
      items: [],
    },
  };

  constructor(props) {
    super(props);

    this.generateMenuItems = generateMenuItems;
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    const { match, getUser } = this.props;

    getUser(match.params.id);
  }

  handleRefresh() {
    const { getTransactionsForContractor, match } = this.props;
    const { pagination, periodRange } = this.state;

    getTransactionsForContractor({
      userId: match.params.id,
      page: pagination.current,
      limit: pagination.pageSize,
      ...periodRange,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let localState = {};

    if (nextProps.currentUser !== prevState.currentUser) {
      localState = {
        currentUser: nextProps.currentUser,
      };
    }

    if (nextProps.contractorTransactions !== prevState.contractorTransactions) {
      localState['contractorTransactions'] = nextProps.contractorTransactions;
    }

    if (nextProps.transactionsListPagination !== prevState.transactionsListPagination) {
      let pag = prevState.pagination;
      localState['transactionsListPagination'] = nextProps.transactionsListPagination;
      localState['pagination'] = { ...pag, total: nextProps.transactionsListPagination.total };
    }

    return Object.keys(localState).length ? localState : null;
  }

  render() {
    const {
      match,
      currentUser,
      currentUserStatistics,
      loadingUserStatistics,
      loadingContractor,
      contractorTransactions,
      loadingTransactions,
      createTransaction,
    } = this.props;
    const { pagination } = this.state;

    const localTransactions = contractorTransactions.items.map((item, key) => {
      return { ...item, key };
    });

    const menuList = [
      {
        key: 'edit',
        action: this.handleEdit,
        label: 'Edit Details',
      },
      {
        key: 'delete',
        action: this.handleDelete,
        label: 'Delete Contractor',
      },
    ];

    return (
      <div>
        <AddTransactionModal
          userId={match.params.id}
          createTransaction={createTransaction}
          isModalVisible={this.state.isModalVisible}
          onChangeVisibility={this.onChangeVisibility}
        />
        <Spin size="large" spinning={loadingContractor}>
          <div className="ContractorDetails">
            <BackBtn to="/payments" label="Payments" />

            {currentUser && (
              <Profile
                handleRefresh={this.handleRefresh}
                isLoading={loadingTransactions}
                {...currentUser.tenantProfile}
                createdAt={currentUser.createdAt}
                updatedAt={currentUser.updatedAt}>
                <Dropdown
                  className="ContractorDetails-options-btn"
                  options={this.generateMenuItems(menuList, match.params.id)}
                  onClick={this.handleTransactionsPeriodChange}>
                  <Button type="primary" ghost>
                    Options
                  </Button>
                </Dropdown>
              </Profile>
            )}
            <Spin size="large" spinning={loadingUserStatistics}>
              <ContractorSummary {...currentUserStatistics} />
            </Spin>
            <Filters onPeriodChange={this.onPeriodChange}>
              <Button type="primary" icon="plus" size="default" onClick={this.handleCustom}>
                Add custom transaction
              </Button>
            </Filters>
            <Spin size="large" spinning={loadingTransactions}>
              <Table
                className="ContractorDetails-table"
                dataSource={localTransactions}
                pagination={pagination}
                onChange={this.handleTableChange}>
                <Column
                  align="center"
                  dataIndex="createdAt"
                  render={renderShortDate}
                  title="Date"
                  width="15%"
                />
                <Column
                  align="center"
                  dataIndex="job"
                  render={this.renderJobName}
                  width="30%"
                  title="Service"
                />
                <Column align="center" dataIndex="location" title="Location" width="20%" />
                <Column
                  align="center"
                  dataIndex="value"
                  render={formatUsd}
                  title="Pay Amt."
                  width="20%"
                />
                <Column align="center" dataIndex="status" title="Status" width="15%" />
              </Table>
            </Spin>
          </div>
        </Spin>
      </div>
    );
  }

  renderJobName = job => {
    return job && job.name;
  };

  handleDelete = async () => {
    const { currentUser, deleteUser, history } = this.props;
    const { firstName, lastName } = currentUser.tenantProfile;
    Modal.confirm({
      title: `Are you sure you want to delete ${firstName} ${lastName}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteUser(currentUser.id);
        history.goBack();
      },
    });
  };

  handleCustom = () => {
    this.setState({ isModalVisible: true });
  };

  onChangeVisibility = (isModalVisible, refreshData = false) => {
    if (refreshData) {
      this.handleTableChange({ ...makeDefaultPagination() });
    }

    this.setState({ isModalVisible });
  };

  handleEdit = () => {
    const { match, history } = this.props;
    history.push(`${match.url}/edit`);
  };

  handleTableChange = pag => {
    const { periodRange, pagination } = this.state;
    const { match, getTransactionsForContractor } = this.props;
    if (pagination.pageSize !== pag.pageSize) {
      this.setState({ pagination: { ...pag, current: 1 } });
    } else {
      this.setState({ pagination: pag });
    }
    getTransactionsForContractor({
      userId: match.params.id,
      page: pagination.current,
      limit: pagination.pageSize,
      ...periodRange,
    });
  };

  onPeriodChange = periodRange => {
    const { match, getTransactionsForContractor, getCurrentUserStatistics } = this.props;
    const pagination = makeDefaultPagination();

    getTransactionsForContractor({
      ...periodRange,
      userId: match.params.id,
      page: pagination.current,
      limit: pagination.pageSize,
    });

    const { period, startDate, endDate } = { ...periodRange };
    const previousTwoWeeksPeriod = movePeriod(period, startDate, endDate, 'prev');

    getCurrentUserStatistics({
      id: match.params.id,
      currentStartDate: startDate,
      currentEndDate: endDate,
      previousStartDate: previousTwoWeeksPeriod.startDate,
      previousEndDate: previousTwoWeeksPeriod.endDate,
    });

    this.setState({
      pagination,
      periodRange: { ...periodRange },
    });
  };
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  currentUserStatistics: state.users.currentUserStatistics,
  loadingUserStatistics: state.loading.effects.users.getCurrentUserStatistics,
  loadingContractor: state.loading.effects.users.getUser,
  contractorTransactions: state.transactions.contractorTransactions,
  transactionsListPagination: state.transactions.transactionsListPagination,
  loadingTransactions: state.loading.effects.transactions.getTransactionsForContractor,
});

const mapDispatchToProps = ({
  transactions: { getTransactionsForContractor, createTransaction },
  users: { getUser, deleteUser, getCurrentUserStatistics },
}) => ({
  createTransaction,
  getTransactionsForContractor,
  getUser,
  deleteUser,
  getCurrentUserStatistics,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorDetails);
