import React from 'react';
import { Icon, Modal, Table } from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import Box from '~components/Box';
import TooltipButton from '~components/TooltipButton';
import RefreshButton from '~components/RefreshButton';
import Header from '~components/Header';
import BackBtn from '~components/BackBtn';
import makeDefaultPagination from '~utils/pagination';
import NotificationService from '~services/notification';
import './LinkedAccounts.scss';

const { Column } = Table;

export class LinkedAccounts extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    fundingSources: PropTypes.arrayOf(PropTypes.object),
    fundingSourcesPagination: PropTypes.object,
  };
  state = {
    fundingSources: [],
    pagination: makeDefaultPagination(),
    fundingSourcesPagination: null,
  };

  componentDidMount() {
    this.handleRefresh();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.fundingSources !== prevState.fundingSources) {
      return {
        fundingSources: nextProps.fundingSources,
      };
    }
    if (nextProps.fundingSourcesPagination !== prevState.fundingSourcesPagination) {
      let pag = prevState.pagination;
      return {
        fundingSourcesPagination: nextProps.fundingSourcesPagination,
        pagination: { ...pag, total: nextProps.fundingSourcesPagination.total },
      };
    }
    return null;
  }

  handleRefresh = () => {
    const { getFundingSource } = this.props;
    getFundingSource();
  };

  handleAdd = () => {
    const { isLoading } = this.props;
    if (isLoading) {
    } else {
      this.props.history.push(`/management/linked-accounts/add`);
    }
  };

  handleBack = () => {
    const { history } = this.props;
    history.push(`/management/billing`);
  };

  handleTableChange = pag => {
    const { getFundingSource } = this.props;
    const { pagination } = this.state;
    let curr = pag.current;
    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }
    this.setState({ pagination: { ...pag, current: curr } });
    getFundingSource();
  };

  handleDelete = async row => {
    const { deleteFundingSource } = this.props;
    const { name } = row;
    Modal.confirm({
      title: `Are you sure you want to delete ${name} funding source?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteFundingSource();
          NotificationService.open({
            type: 'success',
            message: 'Success',
            description: `Linked Account: ${name} successfully deleted.`,
          });
        } catch (err) {
          NotificationService.open({
            type: 'error',
            message: 'Error',
            description: `Can not delete linked account: ${name}`,
          });
        }
        return this.handleRefresh();
      },
    });
  };

  handleOpenVerifyAmount() {
    const { history } = this.props;
    history.push(`/management/linked-accounts/verify`);
  }

  handleVerify = async row => {
    const { verifyFundingSource } = this.props;
    try {
      await verifyFundingSource();
      this.handleRefresh();
      NotificationService.open({
        type: 'success',
        message: 'Success',
        description: `Micro deposit will be sent to your bank account, proceed to next step when you receive it.`,
      });
    } catch (err) {
      NotificationService.open({
        type: 'error',
        message: 'Error',
        description: `Can not verify funding source: ${row.name}`,
      });
    }
  };

  render() {
    const { isLoading, isLoadingVerify, history } = this.props;
    const { pagination, fundingSources } = this.state;
    return (
      <div className="LinkedAccounts">
        <div className="LinkedAccounts__back">
          <BackBtn history={history} goBack={this.handleBack} />
        </div>
        <Header title="Linked Accounts List" size="medium">
          {fundingSources.length === 0 && (
            <TooltipButton tooltip="Add bank info" type="primary" onClick={this.handleAdd}>
              <Icon type="plus" theme="outlined" />
            </TooltipButton>
          )}
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isLoading} />
        </Header>
        <Box>
          <Table
            dataSource={fundingSources}
            className="LinkedAccounts__table"
            rowKey="name"
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={isLoading}>
            <Column align="left" dataIndex="name" title="Name" />
            <Column
              align="center"
              title="Actions"
              className="LinkedAccounts__actions"
              render={(text, record) => {
                return (
                  <span className="LinkedAccounts__table__buttons">
                    <TooltipButton
                      tooltip="Delete funding source"
                      onClick={() => this.handleDelete(record)}>
                      <Icon type="delete" theme="outlined" />
                    </TooltipButton>

                    {!record.status && (
                      <TooltipButton
                        tooltip="Verify funding source"
                        loading={isLoadingVerify}
                        onClick={() => this.handleVerify(record)}>
                        <Icon type="setting" theme="outlined" />
                      </TooltipButton>
                    )}

                    {record.status === 'initiated' && (
                      <TooltipButton
                        tooltip="Verify funding source"
                        onClick={() => this.handleOpenVerifyAmount()}>
                        <Icon type="dollar" theme="outlined" />
                      </TooltipButton>
                    )}
                  </span>
                );
              }}
            />
          </Table>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fundingSources: state.fundingSources.tenantFundingSourceList,
  fundingSourcesPagination: state.fundingSources.tenantFundingSourcePagination,
  isLoading: state.loading.effects.fundingSources.getTenantFundingSourceList,
  isLoadingVerify: state.loading.effects.fundingSources.verifyTenantFundingSource,
});

const mapDispatchToProps = dispatch => ({
  getFundingSource: dispatch.fundingSources.getTenantFundingSourceList,
  deleteFundingSource: dispatch.fundingSources.deleteTenantFundingSource,
  verifyFundingSource: dispatch.fundingSources.verifyTenantFundingSource,
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkedAccounts);
