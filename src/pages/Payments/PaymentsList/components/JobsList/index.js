import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
          <Column align="center" dataIndex="name" title="Name" width="54%" />
          <Column align="center" dataIndex="jobs" title="Num Jobs" width="18%" />
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
