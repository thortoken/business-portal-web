import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Table, Button } from 'antd';

import { AddTransactionModal } from '~pages/Payments/components/AddTransactionModal';

import './JobsList.css';

const { Column } = Table;

const prepareList = list => {
  return list.map((element, index) => {
    return {
      ...element,
      key: index,
    };
  });
};

export class JobsList extends Component {
  static propTypes = {
    jobsList: PropTypes.array,
    renderAmount: PropTypes.func,
    userId: PropTypes.string,
    createTransaction: PropTypes.func,
    handleRefresh: PropTypes.func,
  };
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
    };
  }

  render() {
    const { jobsList, renderAmount, userId, createTransaction, handleRefresh } = this.props;

    return (
      <div>
        <AddTransactionModal
          userId={userId}
          createTransaction={createTransaction}
          isModalVisible={this.state.isModalVisible}
          onChangeVisibility={this.onChangeVisibility}
          handleRefresh={handleRefresh}
        />
        <Table
          className="JobsList JobsList--hidden-empty-state"
          showHeader={false}
          dataSource={prepareList(jobsList)}
          pagination={false}>
          <Column
            align="center"
            dataIndex="name"
            title="Name"
            render={this.renderTransactionsLink}
            width="42%"
          />
          <Column align="center" dataIndex="count" title="Num Jobs" width="12%" />
          <Column align="center" dataIndex="prev" render={renderAmount} title="Prev" width="18%" />
          <Column
            align="center"
            dataIndex="total"
            render={renderAmount}
            width="18%"
            title="Current"
          />
        </Table>
        <div className="JobsList-button">
          <Button ghost onClick={this.handleCustom}>
            + Add Custom
          </Button>
        </div>
      </div>
    );
  }

  renderTransactionsLink = (val, job) => {
    const { userId } = this.props;

    return <Link to={`/contractors/${userId}/transactions/${job.jobId}`}>{val}</Link>;
  };

  onChangeVisibility = (isModalVisible, refreshData = false) => {
    this.setState({ isModalVisible });
  };

  handleCustom = () => {
    this.setState({ isModalVisible: true });
  };
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  createTransaction: dispatch.transactions.createTransaction,
});

export default connect(mapStateToProps, mapDispatchToProps)(JobsList);
