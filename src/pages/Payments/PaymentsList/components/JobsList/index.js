import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Table, Button, Icon, Tooltip } from 'antd';
import { DeleteTransactionModal } from '~pages/Payments/components/DeleteTransactionModal';

import './JobsList.scss';

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
    transactionId: PropTypes.string,
    handleRefresh: PropTypes.func,
  };
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isDeletePaymentModalVisible: false,
      selectedTransaction: {},
    };
  }

  render() {
    const { jobsList, renderAmount, handleRefresh, deleteTransaction } = this.props;
    return (
      <div>
        <DeleteTransactionModal
          selectedTransaction={this.state.selectedTransaction}
          isModalVisible={this.state.isDeletePaymentModalVisible}
          onChangeVisibility={this.onChangeVisibility}
          deleteTransaction={deleteTransaction}
          handleRefresh={handleRefresh}
        />
        <Table
          className="JobsList JobsList--hidden-empty-state"
          showHeader={false}
          dataSource={prepareList(jobsList)}
          pagination={false}>
          <Column align="center" dataIndex={null} title="Name" width="10%" />
          <Column align="center" dataIndex="name" title="Name" width="35%" />
          <Column align="center" dataIndex="jobs" title="Jobs" width="10%" />
          <Column
            align="center"
            dataIndex="total"
            render={renderAmount}
            width="15%"
            title="Current"
          />
          <Column
            align="center"
            dataIndex="status"
            title="Actions"
            render={(text, record) => this.renderActions(text, record)}
            width="15%"
          />
          <Column align="center" dataIndex="status" title="Status" width="15%" />
        </Table>
      </div>
    );
  }

  onChangeVisibility = (isModalVisible, refreshData = false) => {
    this.setState({ isDeletePaymentModalVisible: isModalVisible });
  };
  renderActions = (text, record) => {
    return (
      <div className="paymentslist-subrow-buttons">
        {/* <Tooltip placement="top" title={'Edit'}>
          <Button disabled={record !== 'new'}>
            <Icon type="edit" theme="outlined" />
          </Button>
        </Tooltip> */}
        <Tooltip placement="top" title={'Delete'}>
          <Button onClick={() => this.handleDeletePayment(record)} disabled={text !== 'new'}>
            <Icon type="delete" theme="outlined" />
          </Button>
        </Tooltip>
      </div>
    );
  };
  handleDeletePayment = record => {
    this.setState({ isDeletePaymentModalVisible: true, selectedTransaction: record });
  };
}

const mapStateToProps = state => ({
  user: state.auth.user,
});
export default connect(
  mapStateToProps,
  {}
)(JobsList);
