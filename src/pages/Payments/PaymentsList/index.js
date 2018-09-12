import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Checkbox } from 'antd';
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

import { getCurrentTwoWeeksPeriod } from '~utils/time';
import { formatUsd } from '~utils/number';
import makeDefaultPagination from '~utils/pagination';

import './PaymentsList.css';

const { Column } = Table;

class Payments extends React.Component {
  static propTypes = {
    usersPaymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
    jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool,
    paymentsListPagination: PropTypes.object,
  };

  state = {
    checked: false,
    previous: {
      value: 0,
      contractorsCount: 0,
      startDate: new Date(),
      endDate: new Date(),
    },
    current: {
      value: 0,
      contractorsCount: 0,
      startDate: new Date(),
      endDate: new Date(),
    },
    selectedContractorsIds: new Set(),
    selectedTransactionsSummaryValue: 0,
    pagination: makeDefaultPagination(),
    paymentsListPagination: null,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.props.getJobs();
    this.props.getUsersForPaymentsList({
      status: 'new',
      ...getCurrentTwoWeeksPeriod(),
      page: pagination.current,
      limit: pagination.pageSize,
    });
  }

  handleTableChange = pagination => {
    const { getUsersForPaymentsList } = this.props;
    this.setState({ pagination });
    getUsersForPaymentsList({
      status: 'new',
      ...getCurrentTwoWeeksPeriod(),
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  render() {
    const {
      checked,
      previous,
      current,
      selectedTransactionsIds,
      selectedContractorsIds,
      selectedTransactionsSummaryValue,
      pagination,
    } = this.state;

    const { isLoading, usersPaymentList } = this.props;

    return (
      <div>
        <Header title="Payments" size="medium" />

        <Summary previous={previous} current={current} />

        <div className="PaymentsList-selector">
          <Checkbox onChange={this.onSelectAll} checked={checked} /> Select All
        </div>

        <Box>
          <Table
            dataSource={usersPaymentList}
            className="PaymentsList-table"
            loading={isLoading}
            pagination={pagination}
            rowKey="id"
            onChange={this.handleTableChange}
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
              width="30%"
              title={<TitleWithIcon title="Contractor" icon="user" />}
              render={this.showContractorName}
              className="PaymentsList-contractor-selector"
            />
            <Column
              align="center"
              dataIndex="numOfJobs"
              title="Num Jobs"
              width="15%"
              className="PaymentsList-numOfJobs-selector"
            />
            <Column
              align="center"
              className="PaymentsList-table-current PaymentsList-current-selector"
              dataIndex="total"
              render={this.renderAmount}
              width="20%"
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
                  onClick={() => this.handleSelectUserTransactions(record)}>
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

  handleSelectUserTransactions = user => {
    const { selectedContractorsIds } = this.state;
    let { selectedTransactionsSummaryValue } = this.state;
    const contractorId = user.id;

    if (selectedContractorsIds.has(contractorId)) {
      selectedContractorsIds.delete(contractorId);
      selectedTransactionsSummaryValue -= user.total;
    } else {
      selectedContractorsIds.add(contractorId);
      selectedTransactionsSummaryValue += user.total;
    }
    this.setState({ selectedContractorsIds, selectedTransactionsSummaryValue });
  };

  renderAmount = amount => formatUsd(amount);

  handlePay = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/confirmation`);
  };

  onSelectAll = e => {
    const { usersPaymentList } = this.props;

    let localState = {
      checked: e.target.checked,
      selectedTransactionsSummaryValue: 0,
      selectedContractorsIds: new Set(),
    };

    if (e.target.checked) {
      usersPaymentList.forEach(user => {
        localState.selectedContractorsIds.add(user.id);
        localState.selectedTransactionsSummaryValue += user.total;
      });
    }

    this.setState(localState);
  };

  showContractorName = (val, user) => {
    return <Link to={'/contractors/' + user.id}>{`${user.firstName} ${user.lastName}`}</Link>;
  };

  renderJobsList = record => {
    const { jobs } = this.props;

    return <JobsList jobs={jobs} userId={record.id} renderAmount={this.renderAmount} />;
  };
}

const mapStateToProps = state => ({
  usersPaymentList: state.users.usersPaymentList,
  jobs: state.jobs.jobs,
  isLoading: state.loading.effects.jobs.getJobs,
  paymentsListPagination: state.users.paymentsListPagination,
});

const mapDispatchToProps = dispatch => ({
  getJobs: dispatch.jobs.getJobs,
  getUsersForPaymentsList: dispatch.users.getUsersForPaymentsList,
});

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
