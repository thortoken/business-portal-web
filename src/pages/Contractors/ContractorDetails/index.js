import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getContractor } from '~redux/actions/contractor';
import { getUserTransactions } from '~redux/actions/transactions';
import * as jobActions from '~redux/actions/jobs';

import Dropdown from '~components/Dropdown';
import BackBtn from '~components/BackBtn';
import Activity from './components/Activity';
import ContractorSummary from './components/ContractorSummary';
import Filters from './components/Filters';

import { formatUsd } from '~utils/number';
import { formatDate } from '~utils/time';

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
    getContractor: PropTypes.func.isRequired,
  };

  state = {
    contractor: {},
  };

  constructor(props) {
    super(props);

    this.generateMenuItems = generateMenuItems;
  }

  componentDidMount() {
    const { match, getContractor, getJobs } = this.props;

    getJobs();
    getContractor(match.params.id);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.contractor !== prevState.contractor) {
      return {
        contractor: nextProps.contractor,
      };
    }

    return null;
  }

  componentWillUnmount() {
    this.props.pauseJobs();
  }

  render() {
    const { match, contractor, userTransactions } = this.props;

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
      numOfJobs: 16,
      prev: 1087.67,
      current: 1597.43,
      yearly: 26512.34,
    };

    return (
      <div className="ContractorDetails">
        <BackBtn to="/payments" label="Payments" />
        <div className="ContractorDetails-box-informations">
          <div className="ContractorDetails-basic-data">
            <div className="ContractorDetails-name">
              {contractor.firstName} {contractor.lastName}
            </div>
            <div className="ContractorDetails-since">
              Contractor since {contractor.createdAt.toLocaleDateString()}
            </div>
          </div>
          <div className="ContractorDetails-activity">
            <Activity lastActivityDate={contractor.updatedAt} />
          </div>
        </div>
        <div className="ContractorDetails-box-informations">
          <div className="ContractorDetails-address">
            <div className="ContractorDetails-label">Address</div>
            <div className="ContractorDetails-value">
              <div>{contractor.street}</div>
              <div>
                {contractor.city} {contractor.state} {contractor.postalCode}
              </div>
            </div>
          </div>
          <div className="ContractorDetails-phone">
            <div className="ContractorDetails-label">Phone</div>
            <div className="ContractorDetails-value">{contractor.phone}</div>
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

        <div className="ContractorDetails-table">
          <Table
            dataSource={userTransactions.map(item => {
              return { ...item, key: item.id };
            })}
            bordered>
            <Column align="center" dataIndex="date" render={formatDate} title="Date" width="10%" />
            <Column
              align="center"
              dataIndex="jobId"
              render={this.renderJobName}
              width="30%"
              title="Service"
            />
            {/* <Column align="center" dataIndex="location" title="Location" width="25%" /> */}
            <Column
              align="center"
              dataIndex="jobCost"
              render={formatUsd}
              title="Pay Amt."
              width="20%"
            />
            <Column align="center" dataIndex="status" title="Status" width="15%" />
          </Table>
        </div>
      </div>
    );
  }

  renderJobName = jobId => {
    const { jobs } = this.props;
    return jobs[jobId] ? jobs[jobId].name : '';
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
    const { match, getUserTransactions } = this.props;

    getUserTransactions({ ...periodRange, status: 'PAID', userId: match.params.id });
  };
}

const mapStateToProps = state => ({
  contractor: state.users.currentUser,
  userTransactions: state.transactions.userTransactions,
  jobs: state.jobs.jobs,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getContractor,
      getUserTransactions,
      ...jobActions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContractorDetails);
