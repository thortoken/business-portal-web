import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Icon, Modal } from 'antd';

import NotificationService from '~services/notification';
import TooltipButton from '~components/TooltipButton';
import StatusBlock from '~components/StatusBlock';
import './JobList.scss';

const { Column } = Table;

const prepareList = list => {
  return list.map((element, index) => {
    return {
      ...element,
      key: index,
    };
  });
};

export class JobList extends Component {
  static propTypes = {
    jobList: PropTypes.array,
    renderAmount: PropTypes.func,
    userId: PropTypes.string,
    createTransaction: PropTypes.func,
    deleteTransaction: PropTypes.func,
    handleRefresh: PropTypes.func,
    history: PropTypes.object,
  };

  handleEdit = async row => {
    const { history } = this.props;
    history.push(`/payments/${row.id}/transactions/edit`);
  };

  handleDelete = async row => {
    const { deleteTransaction, handleRefresh } = this.props;
    const { name, id } = row;
    Modal.confirm({
      title: `Are you sure you want to delete "${name}" transaction?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteTransaction(id);
          NotificationService.open({
            type: 'success',
            message: 'Success',
            description: 'Transaction successfully deleted.',
          });
        } catch (err) {
          NotificationService.open({
            type: 'error',
            message: 'Error',
            description: `Can not delete transaction: ${name}`,
          });
        }
        return handleRefresh();
      },
    });
  };

  render() {
    const { jobList, renderAmount } = this.props;

    return (
      <div>
        <Table
          className="JobList JobList--hidden-empty-state"
          showHeader={false}
          dataSource={prepareList(jobList)}
          pagination={false}>
          <Column align="center" dataIndex={null} title="Name" width="10%" />
          <Column align="center" dataIndex="name" title="Name" width="35%" />
          <Column align="center" dataIndex={null} title="Jobs" width="8%" />
          <Column
            align="center"
            dataIndex="total"
            render={renderAmount}
            width="15%"
            title="Current"
          />
          <Column
            align="center"
            title="Actions"
            render={record => this.renderActions(record)}
            width="15%"
          />

          <Column
            align="center"
            // className="JobsList--uppercase"
            dataIndex="status"
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
      </div>
    );
  }

  renderActions = record => {
    return (
      <div className="paymentslist-subrow-buttons">
        <TooltipButton
          placement="top"
          tooltip="Edit"
          disabled={record.status !== 'new'}
          onClick={() => this.handleEdit(record)}>
          <Icon type="edit" theme="outlined" />
        </TooltipButton>
        <TooltipButton
          placement="top"
          tooltip="Delete"
          disabled={record.status !== 'new'}
          onClick={() => this.handleDelete(record)}>
          <Icon type="delete" theme="outlined" />
        </TooltipButton>
      </div>
    );
  };
}

export default connect(null, null)(JobList);
