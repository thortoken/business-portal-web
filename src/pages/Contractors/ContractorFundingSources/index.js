import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Icon, Modal } from 'antd';
import Box from '../../../components/Box/index';
import makeDefaultPagination from '~utils/pagination';
import BackBtn from '~components/BackBtn';

import './ContractorFundingSources.scss';

import Header from '~components/Header';
import RefreshButton from '~components/RefreshButton';

const { Column } = Table;

class ContractorFundingSources extends React.Component {
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
      id: match.params.id,
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
      id: match.params.id,
    });
  };

  handleAdd = () => {
    const { history, match } = this.props;
    history.push(`/contractors/${match.params.id}/fundingSources/add`);
  };

  handleRefresh = () => {
    const { getUserFundingSources, match } = this.props;
    const { pagination } = this.state;
    getUserFundingSources({
      page: pagination.current,
      limit: pagination.pageSize,
      id: match.params.id,
    });
  };

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
    const { isLoading, history } = this.props;
    return (
      <div className="ContractorFundingSources">
        <div className="ContractorFundingSources__back">
          <BackBtn history={history} />
        </div>
        <Header title="Funding Sources List" size="medium">
          <Button type="primary" onClick={this.handleAdd}>
            <Icon type="plus" theme="outlined" />
          </Button>
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isLoading} />
        </Header>
        <Box>
          <Table
            dataSource={userFundingSources}
            className="ContractorFundingSources__table"
            rowKey="id"
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={isLoading}>
            <Column align="left" dataIndex="name" title="Name" />
            <Column align="center" dataIndex="routing" title="Routing" />
            <Column align="center" dataIndex="account" title="Account" />
            <Column
              align="center"
              dataIndex="type"
              title="Type"
              render={(text, record) => {
                return <span className="ContractorFundingSources__table__type">{text}</span>;
              }}
            />
            <Column
              align="center"
              dataIndex="isDefault"
              title="Default"
              render={(text, record) => {
                return <span>{text && <Icon type="check-circle" theme="outlined" />}</span>;
              }}
            />
            <Column
              align="center"
              title="Actions"
              render={(text, record) => {
                return (
                  <span className="ContractorFundingSources__table__buttons">
                    {!record.isDefault && (
                      <Button onClick={() => this.handleDefault(record)}>
                        <Icon type="check-circle" theme="outlined" />
                      </Button>
                    )}
                    <Button onClick={() => this.handleDelete(record)}>
                      <Icon type="delete" theme="outlined" />
                    </Button>
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
  userFundingSources: state.users.userFundingSources,
  userFundingSourcesPagination: state.users.userFundingSourcesPagination,
  isLoading: state.loading.effects.users.getUserFundingSources,
});

const mapDispatchToProps = dispatch => ({
  getUserFundingSources: dispatch.users.getUserFundingSources,
  unmountUserFundingSources: dispatch.users.unmountUserFundingSources,
  deleteFundingSource: dispatch.users.deleteFundingSource,
  setDefaultFundingSource: dispatch.users.setDefaultFundingSource,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorFundingSources);