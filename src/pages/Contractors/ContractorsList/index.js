import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'antd';
import moment from 'moment';
import Box from '../../../components/Box/index';

import './ContractorsList.css';

import Stats from './components/Stats/index';
import ActionBar from './components/ActionBar/index';

const { Column } = Table;

export const prepareActivity = list => {
  return list.map((item, index) => {
    const profile = item.profile;
    let data = {
      key: index,
      activity: new Date(),
      type: 'active',
      contractor: '',
      rank: index,
      prev: 0,
      city: ''
    };
    if (profile && profile.lastActivity) {
      data.activity = profile.lastActivity;
    }
    const timestamp = moment(data.activity).format("x");
    const days = moment().diff(timestamp, 'days');
    data.activity = moment(moment(timestamp)).fromNow();
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
      data.prev = profile.prev || 0;
      data.rank = profile.rank || index;
    }
    return data;
  });
};

class ContractorsList extends React.Component {
  static propTypes = {
    usersList: PropTypes.arrayOf(PropTypes.object),
  };

  state = {
    usersList: []
  };

  componentDidMount() {
    this.props.getUsers();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.usersList !== prevState.usersList) {
      return {
        usersList: nextProps.usersList,
        contractorsData: prepareActivity(nextProps.usersList),
      };
    }
    return null;
  }

  render() {
    const { contractorsData } = this.state;
    return (
      <div className="ContractorsList">
        <ActionBar/>
        <Stats/>
        <Box>
          <Table dataSource={contractorsData} className="ContractorsList__table" bordered>
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
                return <span>$ {text}</span>;
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
});

const mapDispatchToProps = dispatch => ({
  getUsers: dispatch.users.getUsers,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorsList);
