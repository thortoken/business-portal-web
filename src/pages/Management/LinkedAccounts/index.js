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
    getFundingSources: PropTypes.func.isRequired,
    deleteFundingSource: PropTypes.func.isRequired,
    verifyFundingSource: PropTypes.func.isRequired,
    unmountFundingSources: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    fundingSourceList: PropTypes.arrayOf(PropTypes.object),
    fundingSourcePagination: PropTypes.object,
  };
  state = {
    fundingSourceList: [],
    pagination: makeDefaultPagination(),
    fundingSourcePagination: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.fundingSourceList !== prevState.fundingSourceList) {
      return {
        fundingSourceList: nextProps.fundingSourceList,
      };
    }
    if (nextProps.fundingSourcePagination !== prevState.fundingSourcePagination) {
      let pag = prevState.pagination;
      return {
        fundingSourcePagination: nextProps.fundingSourcePagination,
        pagination: { ...pag, total: nextProps.fundingSourcePagination.total },
      };
    }
    return null;
  }

  componentDidMount() {
    this.handleRefresh();
  }

  componentWillUnmount() {
    this.props.unmountFundingSources();
  }

  handleTableChange = pag => {
    const { getFundingSources } = this.props;
    const { pagination } = this.state;
    let curr = pag.current;
    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }
    this.setState({ pagination: { ...pag, current: curr } });
    getFundingSources();
  };

  handleRefresh = () => {
    const { getFundingSources } = this.props;
    getFundingSources();
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
    const { pagination, fundingSourceList } = this.state;
    return (
      <div className="LinkedAccounts">
        <div className="LinkedAccounts__back">
          <BackBtn history={history} goBack={this.handleBack} />
        </div>
        <Header title="Linked Accounts List" size="medium">
          {fundingSourceList.length === 0 && (
            <TooltipButton tooltip="Add bank info" type="primary" onClick={this.handleAdd}>
              <Icon type="plus" theme="outlined" />
            </TooltipButton>
          )}
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isLoading} />
        </Header>
        <Box>
          <Table
            dataSource={fundingSourceList}
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
  fundingSourceList: state.fundingSources.fundingSourceList,
  fundingSourcePagination: state.fundingSources.fundingSourcePagination,
  isLoading: state.loading.effects.fundingSources.getTenantFundingSources,
  isLoadingVerify: state.loading.effects.fundingSources.verifyTenantFundingSource,
});

const mapDispatchToProps = dispatch => ({
  getFundingSources: dispatch.fundingSources.getTenantFundingSources,
  deleteFundingSource: dispatch.fundingSources.deleteTenantFundingSource,
  verifyFundingSource: dispatch.fundingSources.verifyTenantFundingSource,
  unmountFundingSources: dispatch.fundingSources.unmountFundingSources,
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkedAccounts);
