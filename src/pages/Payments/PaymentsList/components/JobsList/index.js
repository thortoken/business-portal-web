import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Table, Button, Icon, Tooltip, Modal } from 'antd';

import NotificationService from '~services/notification';

import './JobsList.scss';
import StatusBlock from '../../../../../components/StatusBlock';

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
    deleteTransaction: PropTypes.func,
    handleRefresh: PropTypes.func,
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
    const { jobsList, renderAmount } = this.props;

    return (
      <div>
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
            width="14%"
            title="Current"
          />
          <Column
            align="center"
            title="Actions"
            render={record => this.renderActions(record)}
            width="13%"
          />

          <Column
            align="center"
            // className="JobsList--uppercase"
            dataIndex="status"
            title="Status"
            width="18%"
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
        <Tooltip placement="top" title={'Edit'}>
          <Button disabled={record.status !== 'new'}>
            <Icon type="edit" theme="outlined" />
          </Button>
        </Tooltip>
        <Tooltip placement="top" title={'Delete'}>
          <Button disabled={record.status !== 'new'} onClick={() => this.handleDelete(record)}>
            <Icon type="delete" theme="outlined" />
          </Button>
        </Tooltip>
      </div>
    );
  };
}

export default connect(null, null)(JobsList);
