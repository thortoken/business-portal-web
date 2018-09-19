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
import { AddFundingSourceModal } from './components/AddFundingSourceModal';

const { Column } = Table;

const generateMenuItems = list => {
  return list.filter(e => !e.isHidden).map(element => {
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
    isAddTransactionModalVisible: false,
    isAddFundingSourceModalVisible: false,
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
      createFundingSource,
    } = this.props;
    const { pagination } = this.state;
    const hasFundingSource =
      currentUser &&
      currentUser.tenantProfile &&
      currentUser.tenantProfile.accountNumber &&
      currentUser.tenantProfile.accountRouting;
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
      {
        isHidden: hasFundingSource,
        key: 'addFundingSource',
        action: this.openAddFundingSourceModal,
        label: 'Add funding source',
      },
      {
        isHidden: !hasFundingSource,
        key: 'deleteFundingSource',
        action: this.handleDeleteFundingSource,
        label: 'Delete funding source',
      },
    ];

    return (
      <div>
        <AddTransactionModal
          userId={match.params.id}
          createTransaction={createTransaction}
          isModalVisible={this.state.isAddTransactionModalVisible}
          onChangeVisibility={this.onChangeVisibilityTransactionModal}
        />
        <AddFundingSourceModal
          createFundingSource={createFundingSource}
          userId={match.params.id}
          isModalVisible={this.state.isAddFundingSourcelVisible}
          onChangeVisibility={this.onChangeVisibilityFundingSourceModal}
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
                openAddFundingSourceModal={this.openAddFundingSourceModal}
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
              <Button
                type="primary"
                icon="plus"
                size="default"
                onClick={this.openAddTransactionModal}>
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

  handleDeleteFundingSource = async () => {
    const { currentUser, deleteFundingSource, getUser, match } = this.props;
    const { firstName, lastName } = currentUser.tenantProfile;
    Modal.confirm({
      title: `Are you sure you want to delete funding source for ${firstName} ${lastName}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        await deleteFundingSource(currentUser.id);
        return getUser(match.params.id);
      },
    });
  };

  openAddTransactionModal = () => {
    this.setState({ isAddTransactionModalVisible: true });
  };

  openAddFundingSourceModal = () => {
    this.setState({ isAddFundingSourcelVisible: true });
  };

  onChangeVisibilityTransactionModal = (isAddTransactionModalVisible, refreshData = false) => {
    if (refreshData) {
      this.handleTableChange({ ...makeDefaultPagination() });
    }

    this.setState({ isAddTransactionModalVisible });
  };

  onChangeVisibilityFundingSourceModal = (isAddFundingSourcelVisible, refreshData = false) => {
    if (refreshData) {
      const { match, getUser } = this.props;
      getUser(match.params.id);
    }
    this.setState({ isAddFundingSourcelVisible });
  };

  handleEdit = () => {
    const { match, history } = this.props;
    history.push(`${match.url}/edit`);
  };

  handleTableChange = pag => {
    const { periodRange, pagination } = this.state;
    const { match, getTransactionsForContractor } = this.props;
    let curr = pag.current;
    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }
    this.setState({ pagination: { ...pag, current: curr } });
    getTransactionsForContractor({
      userId: match.params.id,
      page: curr,
      limit: pag.pageSize,
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
  users: {
    getUser,
    deleteUser,
    getCurrentUserStatistics,
    createFundingSource,
    deleteFundingSource,
  },
}) => ({
  createTransaction,
  getTransactionsForContractor,
  getUser,
  deleteUser,
  getCurrentUserStatistics,
  createFundingSource,
  deleteFundingSource,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorDetails);
