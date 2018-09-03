import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Spin } from 'antd';
import { connect } from 'react-redux';

import Dropdown from '~components/Dropdown';
import BackBtn from '~components/BackBtn';
import Activity from './components/Activity';
import ContractorSummary from './components/ContractorSummary';
import Filters from './components/Filters';

import { formatUsd } from '~utils/number';
import { sumTransactions } from '~utils/summary';

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

    let summary = {
      rank: 1,
      numOfJobs: localTransactions.length,
      prev: 1087.67,
      current: sumTransactions(localTransactions),
      yearly: 26512.34,
    };

    return (
      <Spin size="large" spinning={loadingContractor}>
        <div className="ContractorDetails">
          <BackBtn to="/payments" label="Payments" />
          <div className="ContractorDetails-box-informations">
            <div className="ContractorDetails-basic-data">
              <div className="ContractorDetails-name">
                {currentUser && `${currentUser.profile.firstName} ${currentUser.profile.lastName}`}
              </div>
              <div className="ContractorDetails-since">
                Contractor since {currentUser && this.renderDate(currentUser.createdAt)}
              </div>
            </div>
            <div className="ContractorDetails-activity">
              <Activity lastActivityDate={currentUser && `${currentUser.updatedAt}`} />
            </div>
          </div>
          <div className="ContractorDetails-box-informations">
            <div className="ContractorDetails-address">
              <div className="ContractorDetails-label">Address</div>
              <div className="ContractorDetails-value">
                <div>{currentUser && `${currentUser.address1} ${currentUser.address2}`}</div>
                <div>
                  {currentUser &&
                    `${currentUser.city} ${currentUser.state} ${currentUser.postalCode}`}
                </div>
              </div>
            </div>
            <div className="ContractorDetails-phone">
              <div className="ContractorDetails-label">Phone</div>
              <div className="ContractorDetails-value">{currentUser && `${currentUser.phone}`}</div>
            </div>
            <div className="ContractorDetails-options">
              <Dropdown
                className="ContractorDetails-options-btn"
                options={this.generateMenuItems(menuList, match.params.id)}
                onClick={this.handleTransactionsPeriodChange}>
                <Button type="primary" ghost>
                  Options
                </Button>
              </Dropdown>
            </div>
          </div>

          <ContractorSummary {...summary} />

          <Filters onPeriodChange={this.onPeriodChange} />

          <Spin size="large" spinning={loadingTransactions}>
            <div className="ContractorDetails-table">
              <Table dataSource={localTransactions} bordered>
                <Column
                  align="center"
                  dataIndex="createdAt"
                  render={this.renderDate}
                  title="Date"
                  width="10%"
                />
                <Column
                  align="center"
                  dataIndex="job"
                  render={this.renderJobName}
                  width="30%"
                  title="Service"
                />
                {/* <Column align="center" dataIndex="location" title="Location" width="25%" /> */}
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

  renderDate = date => {
    return new Date(date).toLocaleDateString();
  };

  handleDelete = () => {
    const { match } = this.props;
    console.log('delete contractor', match.params.id);
  };

  handleEdit = () => {
    const { match } = this.props;
    console.log('edit contractor', match.params.id);
  };

  onPeriodChange = periodRange => {
    const { match, getTransactionsForContractor } = this.props;

    getTransactionsForContractor({ ...periodRange, userId: match.params.id });
  };
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  loadingContractor: state.loading.effects.users.getUser,
  contractorTransactions: state.transactions.contractorTransactions,
  loadingTransactions: state.loading.effects.transactions.getTransactionsForContractor,
});

const mapDispatchToProps = ({
  transactions: { getTransactionsForContractor },
  users: { getUser },
}) => ({
  getTransactionsForContractor,
  getUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorDetails);
