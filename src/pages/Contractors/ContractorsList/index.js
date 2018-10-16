import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import moment from 'moment';
import Box from '../../../components/Box/index';
import makeDefaultPagination from '~utils/pagination';
import { getCurrentTwoWeeksPeriod } from '~utils/time';

import './ContractorsList.scss';

import Header from '~components/Header';
import RefreshButton from '~components/RefreshButton';
import AddContractorMenu from '../AddContractorMenu';

const { Column } = Table;

export const prepareActivity = list => {
  return list.map(item => {
    item.lastActivityLabel = item.lastActivity ? moment(moment(item.lastActivity)).fromNow() : '';
    return item;
  });
};

class ContractorsList extends React.Component {
  static propTypes = {
    usersList: PropTypes.arrayOf(PropTypes.object),
    userListPagination: PropTypes.object,
    isLoading: PropTypes.bool,
  };

  state = {
    usersList: [],
    pagination: makeDefaultPagination(),
    userListPagination: null,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.props.getUsers({
      page: pagination.current,
      limit: pagination.pageSize,
      ...getCurrentTwoWeeksPeriod(),
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

  handleTableChange = pag => {
    const { getUsers } = this.props;
    const { pagination } = this.state;
    let curr = pag.current;
    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }
    this.setState({ pagination: { ...pag, current: curr } });
    getUsers({
      page: curr,
      limit: pag.pageSize,
      ...getCurrentTwoWeeksPeriod(),
    });
  };

  handleButtonClick = user => {
    this.props.history.push(`/contractors/${user.id}`);
  };

  handleGoInv = () => {
    this.props.history.push(`/contractors/invitationsList`);
  };

  handleRefresh = () => {
    const { getUsers } = this.props;
    const { pagination } = this.state;
    getUsers({
      page: pagination.current,
      limit: pagination.pageSize,
      ...getCurrentTwoWeeksPeriod(),
    });
  };

  render() {
    const { contractorsData, pagination } = this.state;
    const { isLoading } = this.props;
    return (
      <div className="ContractorsList">
        <Header title="Contractors List" size="medium">
          <Button type="primary" ghost onClick={this.handleGoInv}>
            Invitations List
          </Button>
          <AddContractorMenu />
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isLoading} />
        </Header>
        <Box>
          <Table
            dataSource={contractorsData}
            className="ContractorsList__table"
            rowKey="id"
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={isLoading}>
            <Column align="center" dataIndex="tenantProfile.firstName" title="First Name" />
            <Column align="center" dataIndex="tenantProfile.lastName" title="Last Name" />
            <Column align="center" dataIndex="tenantProfile.city" title="City" />
            <Column align="center" dataIndex="tenantProfile.state" title="State" />
            <Column
              align="center"
              title="Last Activity"
              className="ContractorsList__activity"
              render={(text, record) => {
                return <div>{record.lastActivityLabel}</div>;
              }}
            />
            <Column
              align="center"
              title="Actions"
              render={(text, record) => {
                return <Button onClick={() => this.handleButtonClick(record)}>View Details</Button>;
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

export default connect(mapStateToProps, mapDispatchToProps)(ContractorsList);
