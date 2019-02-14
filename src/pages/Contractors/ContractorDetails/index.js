import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Spin, Modal, Icon } from 'antd';
import { connect } from 'react-redux';

import BackBtn from '~components/BackBtn';
import ContractorSummary from './components/ContractorSummary';
import Filters from './components/Filters';
import Profile from './components/Profile';
import { AddPaymentModal } from '../../Payments/components/AddPaymentModal';
import TooltipButton from '~components/TooltipButton';
import { formatUsd } from '~utils/number';
import { movePeriod, renderShortDate } from '~utils/time';
import makeDefaultPagination from '~utils/pagination';
import NotificationService from '~services/notification';
import StatusBlock from '~components/StatusBlock';
import './ContractorDetails.scss';

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
    getJobs: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    getTransactionsForContractor: PropTypes.func.isRequired,
    transactionsListPagination: PropTypes.object,
  };

  state = {
    isAddPaymentModalVisible: false,
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
    jobList: [],
  };

  constructor(props) {
    super(props);

    this.generateMenuItems = generateMenuItems;
  }

  componentDidMount() {
    const { match, getUser, checkFundingSource, getJobs } = this.props;

    getUser(match.params.id);
    checkFundingSource(match.params.id);

    // TODO: do this when they click the 'add payment' button
    getJobs({
      page: 1,
      limit: 200,
      isActive: true,
      isCustom: false,
    });
  }

  componentWillUnmount() {
    const { changeFundingSourceStatus } = this.props;
    changeFundingSourceStatus(false);
  }

  handleRefresh = () => {
    const { getTransactionsForContractor, match } = this.props;
    const { pagination, periodRange } = this.state;

    getTransactionsForContractor({
      userId: match.params.id,
      page: pagination.current,
      limit: pagination.pageSize,
      ...periodRange,
    });
  };

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

    if (nextProps.hasFundingSource !== prevState.hasFundingSource) {
      localState['hasFundingSource'] = nextProps.hasFundingSource;
    }

    if (nextProps.jobList !== prevState.jobList) {
      localState['jobList'] = nextProps.jobList;
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
      history,
      hasFundingSource,
    } = this.props;
    const { pagination } = this.state;

    const localTransactions = contractorTransactions.items.map((item, key) => {
      return { ...item, key };
    });

    return (
      <div>
        <AddPaymentModal
          jobList={this.state.jobList}
          userId={match.params.id}
          addExistingTransaction={this.props.addExistingTransaction}
          addCustomTransaction={this.props.addCustomTransaction}
          isModalVisible={this.state.isAddPaymentModalVisible}
          onChangeVisibility={this.onChangeVisibilityPaymentModal}
          handleRefresh={this.handleRefresh}
          isLoading={this.props.isJobsListLoading}
        />
        <Spin size="large" spinning={loadingContractor}>
          <div className="ContractorDetails">
            <BackBtn history={history} goBack={this.handleGoBack} />

            {currentUser && (
              <Profile
                handleRefresh={this.handleRefresh}
                isLoading={loadingTransactions}
                hasFundingSource={hasFundingSource}
                {...currentUser.tenantProfile}
                createdAt={currentUser.createdAt}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                updatedAt={currentUser.updatedAt}
                handleRetryContractor={this.handleRetryContractor}
                handleGoToFundingSources={this.handleGoToFundingSources}
                handleGoToDocuments={this.handleAddDwollaDocuments}
                handleSendPasswordReset={this.handleSendPasswordReset}
                handleResendInvitation={this.handleResendInvitation}>
                <Button type="primary" ghost onClick={this.handleGoToFundingSources}>
                  Funding Sources
                </Button>
                <Button
                  style={{ marginLeft: '10px' }}
                  type="primary"
                  ghost
                  onClick={this.handleGoToDocuments}>
                  Documents
                </Button>
              </Profile>
            )}
            <Spin size="large" spinning={loadingUserStatistics}>
              <ContractorSummary {...currentUserStatistics} />
            </Spin>
            <Filters onPeriodChange={this.onPeriodChange}>
              <TooltipButton
                placement="top"
                tooltip="Add a payment"
                type="primary"
                onClick={this.openAddPaymentModal}>
                <Icon type="plus" />
              </TooltipButton>
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
                {/*<Column align="center" dataIndex="location" title="Location" width="20%" />*/}
                <Column
                  align="center"
                  dataIndex="value"
                  render={formatUsd}
                  title="Pay Amt."
                  width="20%"
                />
                <Column
                  align="center"
                  dataIndex="status"
                  className="ContractorDetails-column-status"
                  title="Status"
                  width="15%"
                  render={text => {
                    return (
                      <div>
                        <StatusBlock status={text} />
                      </div>
                    );
                  }}
                />
              </Table>
            </Spin>
          </div>
        </Spin>
      </div>
    );
  }

  handleGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleGoToFundingSources = () => {
    const { history, match } = this.props;
    history.replace(`/contractors/${match.params.id}/fundingSources`);
  };

  handleGoToDocuments = () => {
    const { history, match } = this.props;
    history.replace(`/contractors/${match.params.id}/documents`);
  };

  handleAddDwollaDocuments = () => {
    const { history, match } = this.props;
    history.replace(`/contractors/${match.params.id}/documents/dwolla`);
  };

  handleRetryContractor = () => {
    const { history, match } = this.props;
    history.push(`/contractors/${match.params.id}/retry`);
  };

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
      onOk: async () => {
        try {
          await deleteUser(currentUser.id);
          NotificationService.open({
            type: 'success',
            message: 'Success',
            description: 'User successfully deleted.',
          });
          history.goBack();
        } catch (err) {
          if (err.response.status === 409) {
            NotificationService.open({
              type: 'warning',
              message: 'Warning',
              description: err.response.data.error,
            });
          }
        }
      },
    });
  };

  handleSendPasswordReset = async () => {
    const { currentUser, sendPasswordReset } = this.props;
    const { firstName, lastName } = currentUser.tenantProfile;
    Modal.confirm({
      title: `Are you sure you want to send a password reset for ${firstName} ${lastName}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await sendPasswordReset(currentUser.id);
          NotificationService.open({
            type: 'success',
            message: 'Success',
            description: 'Password reset sent.',
          });
        } catch (err) {
          if (err.response.status === 409) {
            NotificationService.open({
              type: 'warning',
              message: 'Warning',
              description: err.response.data.error,
            });
          }
        }
      },
    });
  };

  handleResendInvitation = async () => {
    const { currentUser, resendUserInvitation } = this.props;
    const { firstName, lastName } = currentUser.tenantProfile;
    Modal.confirm({
      title: `Are you sure you want to resend the invitation for ${firstName} ${lastName}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await resendUserInvitation({ userId: currentUser.id });
          NotificationService.open({
            type: 'success',
            message: 'Success',
            description: 'Invitation sent.',
          });
        } catch (err) {
          if (err.response.status === 409) {
            NotificationService.open({
              type: 'warning',
              message: 'Warning',
              description: err.response.data.error,
            });
          }
        }
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

  openAddPaymentModal = () => {
    this.setState({ isAddPaymentModalVisible: true });
  };

  openAddFundingSourceModal = () => {
    this.setState({ isAddFundingSourcelVisible: true });
  };

  onChangeVisibilityPaymentModal = (isAddPaymentModalVisible, refreshData = false) => {
    if (refreshData) {
      this.handleTableChange({ ...makeDefaultPagination() });
    }

    this.setState({ isAddPaymentModalVisible });
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
      userId: match.params.id,
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
  hasFundingSource: state.fundingSources.userHasFundingSource,
  isJobListLoading: state.loading.effects.jobs.getJobs,
  jobList: state.jobs.jobList,
});

const mapDispatchToProps = ({
  transactions: {
    getTransactionsForContractor,
    createTransaction,
    addExistingTransaction,
    addCustomTransaction,
  },
  users: { getUser, deleteUser, getCurrentUserStatistics, sendPasswordReset },
  fundingSources: {
    checkUserFundingSource,
    changeUserFundingSourceStatus,
    deleteUserFundingSource,
    createUserFundingSource,
  },
  jobs: { getJobs },
  invitations: { resendUserInvitation },
}) => ({
  createTransaction,
  addExistingTransaction,
  addCustomTransaction,
  getTransactionsForContractor,
  getUser,
  deleteUser,
  getCurrentUserStatistics,
  createFundingSource: createUserFundingSource,
  deleteFundingSource: deleteUserFundingSource,
  checkFundingSource: checkUserFundingSource,
  changeFundingSourceStatus: changeUserFundingSourceStatus,
  sendPasswordReset,
  getJobs,
  resendUserInvitation,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorDetails);
