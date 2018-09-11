import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import moment from 'moment';
import Box from '../../../components/Box/index';
import makeDefaultPagination from '~utils/pagination';
import { getCurrentTwoWeeksPeriod } from '~utils/time';
import { formatUsd } from '~utils/number';

import './ContractorsList.css';

import ActionBar from './components/ActionBar/index';

const { Column } = Table;

export const prepareActivity = list => {
  return list.map((item) => {
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
    isLoading: false,
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
      pag.total = nextProps.userListPagination.total;
      return {
        userListPagination: nextProps.userListPagination,
        pagination: pag,
      };
    }
    if (nextProps.isLoading !== prevState.isLoading) {
      return {
        isLoading: nextProps.isLoading,
      };
    }
    return null;
  }

  handleTableChange = pag => {
    const { pagination } = this.state;
    const { getUsers } = this.props;
    pagination.current = pag.current;
    pagination.pageSize = pag.pageSize;
    this.setState({ pag });
    getUsers({
      page: pagination.current,
      limit: pagination.pageSize,
      ...getCurrentTwoWeeksPeriod(),
    });
  };

  handleButtonClick = user => {
    this.props.history.push(`/contractors/${user.id}`);
  };

  render() {
    const { contractorsData, pagination, isLoading } = this.state;
    return (
      <div className="ContractorsList">
        <ActionBar />
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
