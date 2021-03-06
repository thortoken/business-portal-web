import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Icon, Input, Button } from 'antd';
import moment from 'moment';

import TooltipButton from '~components/TooltipButton';
import Box from '~components/Box';
import makeDefaultPagination from '~utils/pagination';
import { getCurrentTwoWeeksPeriod } from '~utils/time';
import Header from '~components/Header';
import RefreshButton from '~components/RefreshButton';
import StatusBlock from '~components/StatusBlock';
import AddContractorMenu from './components/AddContractorMenu';
import './ContractorList.scss';

const { Column } = Table;
const Search = Input.Search;

export const prepareActivity = list => {
  return list.map(item => {
    item.lastActivityLabel = item.lastActivity ? moment(moment(item.lastActivity)).fromNow() : '';
    return item;
  });
};

class ContractorList extends React.Component {
  static propTypes = {
    usersList: PropTypes.arrayOf(PropTypes.object),
    userListPagination: PropTypes.object,
    isLoading: PropTypes.bool,
  };

  state = {
    usersList: [],
    pagination: makeDefaultPagination(),
    userListPagination: null,
    searchText: null,
    sorters: {},
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.updateTable({
      current: pagination.current,
      limit: pagination.pageSize,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.usersList !== prevState.usersList) {
      return {
        usersList: nextProps.usersList,
        contractorsData: prepareActivity(nextProps.usersList),
      };
    }
    if (nextProps.userListPagination !== prevState.userListPagination) {
      let pag = prevState.pagination;
      return {
        userListPagination: nextProps.userListPagination,
        pagination: { ...pag, total: nextProps.userListPagination.total },
      };
    }
    return null;
  }

  handleTableChange = (pag, filters, sorters) => {
    const { pagination, searchText } = this.state;
    let curr = pag.current;

    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }
    this.setState({ pagination: { ...pag, current: curr }, filters, sorters });

    this.updateTable({
      current: curr,
      limit: pag.pageSize,
      orderBy: sorters.columnKey || undefined,
      order: sorters.order || undefined,
      searchText: searchText || undefined,
    });
  };

  updateTable(config) {
    const { getUsers } = this.props;
    let column = null;
    if (config.orderBy) {
      column = config.orderBy.split('.')[1];
    }
    getUsers({
      ...getCurrentTwoWeeksPeriod(),
      page: config.current,
      limit: config.limit,
      orderBy: column || undefined,
      order: config.order || undefined,
      status: 'invited',
      name: config.searchText || undefined,
    });
  }

  handleSearch = (text, confirm) => {
    const { pagination, sorters } = this.state;

    this.setState({ pagination: { ...pagination, current: 1 } });

    this.updateTable({
      current: 1,
      limit: pagination.pageSize,
      orderBy: sorters.columnKey || undefined,
      order: sorters.order || undefined,
      searchText: text || undefined,
    });
    confirm();
  };

  onSearch = e => {
    this.setState({ searchText: e.target.value });
  };

  clearSearch = clearFilters => {
    this.setState({ searchText: null });
    this.handleSearch(null, clearFilters);
  };

  handleButtonClick = user => {
    this.props.history.push(`/contractors/${user.id}`);
  };

  handleGoInv = () => {
    this.props.history.push(`/contractors/invitationsList`);
  };

  handleRefresh = () => {
    const { pagination } = this.state;
    this.updateTable({
      current: pagination.current,
      limit: pagination.pageSize,
    });
  };

  handleInvite = () => {
    this.props.history.push('/contractors/invite');
  };

  goToContractor = user => {
    const { history } = this.props;
    if (user) {
      history.push('/contractors/' + user.id);
    }
  };

  render() {
    const { contractorsData, pagination, searchText } = this.state;
    const { isLoading } = this.props;

    return (
      <div className="ContractorList">
        <Header title="Contractor List" size="medium">
          <AddContractorMenu />
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isLoading} />
        </Header>
        <div className="ContractorList__additional-box">
          <div className="ContractorList__additional-box--left ContractorList__additional-box--box" />
        </div>
        <Box>
          <Table
            locale={{
              emptyText: (
                <div>
                  You don't have any contractors yet<br />
                  <br />
                  <Button type="primary" onClick={this.handleInvite}>
                    Send some invites
                  </Button>
                </div>
              ),
            }}
            dataSource={contractorsData}
            className="ContractorList__table"
            rowKey="id"
            onChange={this.handleTableChange}
            pagination={pagination}
            onRow={record => ({
              onClick: () => {
                this.goToContractor(record);
              },
            })}
            loading={isLoading}>
            <Column align="center" dataIndex="tenantProfile.firstName" title="First Name" sorter />
            <Column
              align="center"
              dataIndex="tenantProfile.lastName"
              title="Last Name"
              filterDropdown={({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                const prefix = searchText ? (
                  <Icon
                    type="close-circle"
                    key={'searchText'}
                    onClick={() => {
                      this.clearSearch(clearFilters);
                    }}
                  />
                ) : null;
                return (
                  <div className="ContractorList__search-dropdown">
                    <Search
                      prefix={prefix}
                      className="ContractorList__additional-box--search"
                      placeholder="Find Contractor"
                      onChange={this.onSearch}
                      value={searchText}
                      onSearch={value => this.handleSearch(value, confirm)}
                      enterButton
                    />
                  </div>
                );
              }}
              filterIcon={filtered => <Icon type="search" />}
            />
            <Column align="center" dataIndex="tenantProfile.city" title="City" />
            <Column align="center" dataIndex="tenantProfile.state" title="State" />
            <Column
              align="center"
              title="Last Activity"
              className="ContractorList__activity"
              render={(text, record) => {
                return <div>{record.lastActivityLabel}</div>;
              }}
            />
            <Column
              align="center"
              title="Status"
              dataIndex="tenantProfile.status"
              render={text => {
                return (
                  <div>
                    <StatusBlock status={text} />
                  </div>
                );
              }}
            />
            <Column
              align="center"
              title="Actions"
              render={(text, record) => {
                return (
                  <TooltipButton
                    tooltip="View details"
                    onClick={event => {
                      event.stopPropagation();
                      this.handleButtonClick(record);
                    }}>
                    <Icon type="info-circle" theme="outlined" />
                  </TooltipButton>
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
  usersList: state.users.usersList,
  userListPagination: state.users.userListPagination,
  isLoading: state.loading.effects.users.getUsers,
});

const mapDispatchToProps = dispatch => ({
  getUsers: dispatch.users.getUsers,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorList);
