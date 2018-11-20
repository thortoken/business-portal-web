import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';

import './AddTransaction.scss';

import NotificationService from '../../../../services/notification';

export class DeleteTransactionModal extends Component {
  static propTypes = {
    createTransaction: PropTypes.func,
    onChangeVisibility: PropTypes.func,
    handleRefresh: PropTypes.func,
    userId: PropTypes.string,
  };
  state = {
    createdTransaction: null,
    isValid: false,
    errorMsg: '',
  };

  handleModalDelete = async () => {
    const {
      onChangeVisibility,
      handleRefresh,
      selectedTransaction,
      deleteTransaction,
    } = this.props;
    try {
      await deleteTransaction({ transactionID: selectedTransaction.id });
      onChangeVisibility(false, true);
      handleRefresh();
    } catch (err) {
      if (err.response) {
        this.setState({ errorMsg: err.response.data.error || '' });
        NotificationService.open({
          type: 'warning',
          message: 'Warning',
          description: err.response.data.error || '',
        });
      }
    }
  };

  handleModalCancel = () => {
    const { onChangeVisibility } = this.props;
    onChangeVisibility(false);
    this.setState({ errorMsg: '' });
  };

  render() {
    const { errorMsg } = this.state;

    return (
      <Modal
        title="Delete transaction"
        visible={this.props.isModalVisible}
        footer={null}
        onCancel={this.handleModalCancel}
        destroyOnClose>
        <div className="AddTransaction_error-message">{errorMsg}</div>
        <div>Are you sure you want to delete this transaction?</div>
        <Button onClick={this.handleModalDelete}>Delete</Button>
      </Modal>
    );
  }
}

export default DeleteTransactionModal;
