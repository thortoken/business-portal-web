import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Table, Button } from 'antd';

import { AddTransactionModal } from '../../../../Payments/components/AddTransactionModal';

import './JobsList.css';

const { Column } = Table;

export class JobsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
    };
  }

  render() {
    const { jobsList, renderAmount, userId, createTransaction } = this.props;

    return (
      <div>
        <AddTransactionModal
          userId={userId}
          createTransaction={createTransaction}
          isModalVisible={this.state.isModalVisible}
          onChangeVisibility={this.onChangeVisibility}
        />
        <Table
          className="JobsList JobsList--hidden-empty-state"
          showHeader={false}
          dataSource={jobsList}
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

const mapDispatch = ({ transactions: { createTransaction } }) => ({
  createTransaction,
});

const mapStateToProps = state => ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps, mapDispatch)(JobsList);
