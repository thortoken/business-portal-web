import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Icon, Modal } from 'antd';

import Box from '~components/Box/index';
import makeDefaultPagination from '~utils/pagination';
import BackBtn from '~components/BackBtn';
import TooltipButton from '~components/TooltipButton';
import Header from '~components/Header';
import RefreshButton from '~components/RefreshButton';
import NotificationService from '~services/notification';
import './FundingSourceList.scss';

const { Column } = Table;

class FundingSourceList extends React.Component {
  static propTypes = {
    userFundingSources: PropTypes.arrayOf(PropTypes.object),
    userFundingSourcesPagination: PropTypes.object,
    isLoading: PropTypes.bool,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    userFundingSources: [],
    pagination: makeDefaultPagination(),
    userFundingSourcesPagination: null,
  };

  componentDidMount() {
    const { pagination } = this.state;
    const { getUserFundingSources, match } = this.props;
    getUserFundingSources({
      page: pagination.current,
      limit: pagination.pageSize,
      userId: match.params.id,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userFundingSources !== prevState.userFundingSources) {
      return {
        userFundingSources: nextProps.userFundingSources,
      };
    }
    if (nextProps.userFundingSourcesPagination !== prevState.userFundingSourcesPagination) {
      let pag = prevState.pagination;
      return {
        userFundingSourcesPagination: nextProps.userFundingSourcesPagination,
        pagination: { ...pag, total: nextProps.userFundingSourcesPagination.total },
      };
    }
    return null;
  }

  handleTableChange = pag => {
    const { getUserFundingSources, match } = this.props;
    const { pagination } = this.state;
    let curr = pag.current;
    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }
    this.setState({ pagination: { ...pag, current: curr } });
    getUserFundingSources({
      page: curr,
      limit: pag.pageSize,
      userId: match.params.id,
    });
  };

  handleAdd = () => {
    const { history, match } = this.props;
    history.push(`/contractors/${match.params.id}/fundingSources/add`);
  };

  handleGoBack = () => {
    const { history, match } = this.props;
    history.replace(`/contractors/${match.params.id}`);
  };

  handleRefresh = () => {
    const { getUserFundingSources, match } = this.props;
    const { pagination } = this.state;
    getUserFundingSources({
      page: pagination.current,
      limit: pagination.pageSize,
      userId: match.params.id,
    });
  };

  handleVerify = async row => {
    const { verifyFundingSource } = this.props;
    try {
      await verifyFundingSource(row.id);
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

  handleOpenVerifyAmount(row) {
    const { history, match } = this.props;
    history.push(`/contractors/${match.params.id}/fundingSources/verify/${row.id}`);
  }

  handleDelete = async row => {
    const { deleteFundingSource, match } = this.props;
    const { id, name } = row;
    Modal.confirm({
      title: `Are you sure you want to delete "${name}" funding source?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        await deleteFundingSource({ userId: match.params.id, fundingId: id });
        return this.handleRefresh();
      },
    });
  };

  handleDefault = async row => {
    const { setDefaultFundingSource, match } = this.props;
    const { id, name } = row;
    Modal.confirm({
      title: `Are you sure you want to set "${name}" as default funding source?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        await setDefaultFundingSource({ userId: match.params.id, fundingId: id });
        return this.handleRefresh();
      },
    });
  };

  render() {
    const { userFundingSources, pagination } = this.state;
    const { isLoading, history, isLoadingVerify } = this.props;
    return (
      <div className="FundingSourceList">
        <div className="FundingSourceList__back">
          <BackBtn history={history} goBack={this.handleGoBack} />
        </div>
        <Header title="Funding Source List" size="medium">
          <Button type="primary" onClick={this.handleAdd}>
            <Icon type="plus" theme="outlined" />
          </Button>
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isLoading} />
        </Header>
        <Box>
          <Table
            dataSource={userFundingSources}
            className="FundingSourceList__table"
            rowKey="id"
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={isLoading}>
            <Column align="left" dataIndex="name" title="Name" />
            <Column
              align="center"
              dataIndex="type"
              title="Type"
              render={text => {
                return <span className="FundingSourceList__table__type">{text}</span>;
              }}
            />
            <Column
              align="center"
              dataIndex="isDefault"
              title="Default"
              render={text => {
                return <span>{text && <Icon type="check-circle" theme="outlined" />}</span>;
              }}
            />
            <Column
              align="center"
              title="Actions"
              render={(text, record) => {
                return (
                  <span className="FundingSourceList__table__buttons">
                    {!record.isDefault && (
                      <Button onClick={() => this.handleDefault(record)}>
                        <Icon type="check-circle" theme="outlined" />
                      </Button>
                    )}
                    <Button onClick={() => this.handleDelete(record)}>
                      <Icon type="delete" theme="outlined" />
                    </Button>
                    {!record.status && (
                      <TooltipButton
                        tooltip="Verify funding source."
                        loading={isLoadingVerify}
                        onClick={() => this.handleVerify(record)}>
                        <Icon type="setting" theme="outlined" />
                      </TooltipButton>
                    )}

                    {record.status === 'initiated' && (
                      <TooltipButton
                        tooltip="Verify funding source."
                        onClick={() => this.handleOpenVerifyAmount(record)}>
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
  userFundingSources: state.fundingSources.userFundingSourceList,
  userFundingSourcesPagination: state.fundingSources.userFundingSourcePagination,
  isLoading: state.loading.effects.fundingSources.getUserFundingSourceList,
  isLoadingVerify: state.loading.effects.fundingSources.verifyUserFundingSource,
});

const mapDispatchToProps = dispatch => ({
  getUserFundingSources: dispatch.fundingSources.getUserFundingSourceList,
  unmountUserFundingSources: dispatch.fundingSources.unmountUserFundingSourceList,
  deleteFundingSource: dispatch.fundingSources.deleteUserFundingSource,
  setDefaultFundingSource: dispatch.fundingSources.setUserDefaultFundingSource,
  verifyFundingSource: dispatch.fundingSources.verifyUserFundingSource,
});

export default connect(mapStateToProps, mapDispatchToProps)(FundingSourceList);
