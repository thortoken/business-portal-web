import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Spin, Modal } from 'antd';
import { connect } from 'react-redux';

import Dropdown from '~components/Dropdown';
import BackBtn from '~components/BackBtn';
import ContractorSummary from './components/ContractorSummary';
import Filters from './components/Filters';
import Profile from './components/Profile';

import { formatUsd } from '~utils/number';
import { movePeriod, renderDate } from '~utils/time';

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
  };

  state = {
    currentUser: {},
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
  }

  componentDidMount() {
    const { match, getUser } = this.props;

    getUser(match.params.id);
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
    } = this.props;

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
      <Spin size="large" spinning={loadingContractor}>
        <div className="ContractorDetails">
          <BackBtn to="/payments" label="Payments" />

          {currentUser && (
            <Profile
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
          <Filters onPeriodChange={this.onPeriodChange} />
          <Spin size="large" spinning={loadingTransactions}>
            <div className="ContractorDetails-table">
              <Table dataSource={localTransactions}>
                <Column
                  align="center"
                  dataIndex="createdAt"
                  render={renderDate}
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
            </div>
          </Spin>
        </div>
      </Spin>
    );
  }

  renderJobName = job => {
    return job && job.name;
  };

  handleDelete = async () => {
    const { match, currentUser, deleteUser, history } = this.props;
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
    console.log('delete contractor', match.params.id);
  };

  handleEdit = () => {
    const { match, history } = this.props;
    history.push(`${match.url}/edit`);
  };

  onPeriodChange = periodRange => {
    const { match, getTransactionsForContractor, getCurrentUserStatistics } = this.props;

    getTransactionsForContractor({ ...periodRange, userId: match.params.id });

    const { period, startDate, endDate } = { ...periodRange };
    const previousTwoWeeksPeriod = movePeriod(period, startDate, endDate, 'prev');

    getCurrentUserStatistics({
      id: match.params.id,
      currentStartDate: startDate,
      currentEndDate: endDate,
      previousStartDate: previousTwoWeeksPeriod.startDate,
      previousEndDate: previousTwoWeeksPeriod.endDate,
    });
  };
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  currentUserStatistics: state.users.currentUserStatistics,
  loadingUserStatistics: state.loading.effects.users.getCurrentUserStatistics,
  loadingContractor: state.loading.effects.users.getUser,
  contractorTransactions: state.transactions.contractorTransactions,
  loadingTransactions: state.loading.effects.transactions.getTransactionsForContractor,
});

const mapDispatchToProps = ({
  transactions: { getTransactionsForContractor },
  users: { getUser, deleteUser, getCurrentUserStatistics },
}) => ({
  getTransactionsForContractor,
  getUser,
  deleteUser,
  getCurrentUserStatistics,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorDetails);
