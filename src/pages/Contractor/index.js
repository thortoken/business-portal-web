import React from 'react';
import PropTypes from 'prop-types';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';

import { formatUsd } from '~utils/number';
import { getCurrentTwoWeeksPeriod, renderShortDate } from '~utils/time';
import makeDefaultPagination from '~utils/pagination';
import StatusBlock from '~components/StatusBlock';
import './Contractor.scss';

const { Column } = Table;

class Contractor extends React.Component {
  static propTypes = {
    getTransactions: PropTypes.func.isRequired,
    transactionsListPagination: PropTypes.object,
  };

  state = {
    isAddPaymentModalVisible: false,
    isAddFundingSourceModalVisible: false,
    currentUser: {},
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
    jobsList: [],
  };

  componentDidMount() {
    const { user, history } = this.props;
    if (user.status !== 'active') {
      history.push('/on-boarding');
    } else {
      this.handleRefresh();
    }
  }

  componentWillUnmount() {}

  handleRefresh = () => {
    const { getTransactions } = this.props;
    const { pagination } = this.state;

    getTransactions({
      page: pagination.current,
      limit: pagination.pageSize,
      ...getCurrentTwoWeeksPeriod(),
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

    return Object.keys(localState).length ? localState : null;
  }

  render() {
    const { contractorTransactions, loadingTransactions } = this.props;
    const { pagination } = this.state;

    const localTransactions = contractorTransactions.items.map((item, key) => {
      return { ...item, key };
    });

    return (
      <div className="Contractor">
        <Spin size="large" spinning={loadingTransactions}>
          <Table
            className="Contractor-table"
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
              className="Contractor-column-status"
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
    );
  }

  renderJobName = job => {
    return job && job.name;
  };

  handleTableChange = pag => {
    const { pagination } = this.state;
    const { getTransactions } = this.props;
    let curr = pag.current;
    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }
    this.setState({ pagination: { ...pag, current: curr } });
    getTransactions({
      page: curr,
      limit: pag.pageSize,
    });
  };
}

const mapStateToProps = state => ({
  user: state.auth.user,
  contractorTransactions: state.transactions.contractorTransactions,
  transactionsListPagination: state.transactions.transactionsListPagination,
  loadingTransactions: state.loading.effects.transactions.getTransactions,
});

const mapDispatchToProps = dispatch => ({
  getTransactions: dispatch.transactions.getTransactions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Contractor);
