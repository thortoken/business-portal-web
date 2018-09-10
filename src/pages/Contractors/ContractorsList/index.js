import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'antd';
import moment from 'moment';
import Box from '../../../components/Box/index';
import PaginationConfig from '~utils/pagination';
import { getCurrentTwoWeeksPeriod } from '~utils/time';
import { formatUsd } from '~utils/number';

import './ContractorsList.css';

import Stats from './components/Stats/index';
import ActionBar from './components/ActionBar/index';

const { Column } = Table;

export const prepareActivity = list => {
  return list.map((item, index) => {
    const profile = item.tenantProfile;
    const lastActivity = item.lastActivity;
    let data = {
      key: index,
      activity: new Date(),
      type: 'active',
      contractor: '',
      rank: index,
      prev: 0,
      city: ''
    };
    if (lastActivity) {
      data.activity = lastActivity;
    }
    const days = moment().diff(moment(data.activity), 'days');
    data.activity = moment(moment(data.activity)).fromNow();
    if (days < 7) {
      data.type = 'active';
    } else if (days >= 7 && days < 31) {
      data.type = 'resting';
    } else {
      data.type = 'inactive';
    }
    if (profile) {
      data.contractor = `${profile.firstName} ${profile.lastName}`;
      data.city = profile.city;
    }
    if (item.prev) {
      data.prev = formatUsd(item.prev);
    }
    if (item.rank) {
      data.rank = item.rank;
    }
    return data;
  });
};

class ContractorsList extends React.Component {
  static propTypes = {
    usersList: PropTypes.arrayOf(PropTypes.object),
    userListPagination: PropTypes.object,
    usersListLoading: PropTypes.bool,
  };

  state = {
    usersList: [],
    pagination: PaginationConfig,
    userListPagination: null,
    usersListLoading: false,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.props.getUsers({ page: pagination.current, limit: pagination.pageSize, ...getCurrentTwoWeeksPeriod() });
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
      pag.total = nextProps.userListPagination.total;
      return {
        userListPagination: nextProps.userListPagination,
        pagination: pag,
      };
    }
    if (nextProps.usersListLoading !== prevState.usersListLoading) {
      return {
        usersListLoading: nextProps.usersListLoading,
      };
    }
    return null;
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState({ pagination });
    this.props.getUsers({ page: pager.current, limit: pager.pageSize, ...getCurrentTwoWeeksPeriod() });
  };

  render() {
    const { contractorsData, pagination, usersListLoading } = this.state;
    return (
      <div className="ContractorsList">
        <ActionBar/>
        <Stats/>
        <Box>
          <Table
            dataSource={contractorsData}
            className="ContractorsList__table"
            bordered
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={usersListLoading}
          >
            <Column
              align="center"
              dataIndex="rank"
              defaultSortOrder="ascend"
              sorter={(a, b) => a.rank - b.rank}
              title="Rank"
            />
            <Column align="center" dataIndex="contractor" title="Contractor"/>
            <Column
              align="center"
              dataIndex="activity"
              title="Activity"
              className="ContractorsList__activity"
              render={(text, record) => {
                let activeClass = 'ContractorsList--' + record.type;
                return <div className={activeClass}>{text}</div>;
              }}
            />
            <Column
              align="center"
              dataIndex="prev"
              title="Prev"
              render={text => {
                return <span>{text}</span>;
              }}
            />
            <Column align="center" dataIndex="city" title="City"/>
          </Table>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  usersList: state.users.usersList,
  userListPagination: state.users.userListPagination,
  usersListLoading: state.users.usersListLoading
});

const mapDispatchToProps = dispatch => ({
  getUsers: dispatch.users.getUsers,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorsList);
