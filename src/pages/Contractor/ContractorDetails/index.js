import React from 'react';
import PropTypes from 'prop-types';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';

import { formatUsd } from '~utils/number';
import { getCurrentTwoWeeksPeriod, renderShortDate } from '~utils/time';
import makeDefaultPagination from '~utils/pagination';
import StatusBlock from '~components/StatusBlock';
import Header from '~components/Header';
import RefreshButton from '~components/RefreshButton';
import './ContractorDetails.scss';

const { Column } = Table;

class ContractorDetails extends React.Component {
  static propTypes = {
    getTransactions: PropTypes.func.isRequired,
    transactionPagination: PropTypes.object,
  };

  state = {
    pagination: makeDefaultPagination(),
    transactionPagination: null,
    contractorTransactions: {
      items: [],
    },
  };

  async componentDidMount() {
    this.handleRefresh();
  }

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

    if (nextProps.contractorTransactions !== prevState.contractorTransactions) {
      localState['contractorTransactions'] = nextProps.contractorTransactions;
    }

    if (nextProps.transactionPagination !== prevState.transactionPagination) {
      let pag = prevState.pagination;
      localState['transactionPagination'] = nextProps.transactionPagination;
      localState['pagination'] = { ...pag, total: nextProps.transactionPagination.total };
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
      <div className="ContractorDetails">
        <Header title="Payments List" size="medium">
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={false} />
        </Header>
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
  contractorTransactions: state.transactions.contractorTransactions,
  transactionPagination: state.transactions.transactionPagination,
  loadingTransactions: state.loading.effects.transactions.getTransactions,
});

const mapDispatchToProps = dispatch => ({
  getTransactions: dispatch.transactions.getTransactions,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorDetails);
