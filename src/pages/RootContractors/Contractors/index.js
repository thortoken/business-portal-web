import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import Box from '../../../components/Box/index';

import './Contractors.css';

import Stats from './components/Stats/index';
import ActionBar from './components/ActionBar/index';

const { Column } = Table;

/* contractor table model

  rank: number
  firstName: string
  lastName: string
  lastActivity: string/date
  prev: number
  city: string

*/

/* contractors stats

  count: number
  types: [
    active: {
    count: number
    percent: number
  }
  resting: {
    count: number
    percent: number
  }
  inactive: {
    count: number
    percent: number
  }]

*/

const contractorsMockedData = [
  {
    key: 1,
    contractor: 'Mikaelo Angelo',
    lastActivity: 1534423595000,
    prev: 1200,
    city: 'Warsaw',
    rank: 0,
  },
  {
    key: 2,
    contractor: 'Mikey Mike',
    lastActivity: 1533991595000,
    prev: 892,
    city: 'Lodz',
    rank: 0,
  },
  {
    key: 3,
    contractor: 'Dany Hoo',
    lastActivity: 1533732395000,
    prev: 900,
    city: 'Warsaw',
    rank: 0,
  },
  {
    key: 4,
    contractor: 'Dirty Harry',
    lastActivity: 1533386795000,
    prev: 1890,
    city: 'Poznan',
    rank: 0,
  },
  {
    key: 5,
    contractor: 'Arnold Black',
    lastActivity: 1533127595000,
    prev: 876,
    city: 'Kracov',
    rank: 0,
  },
  {
    key: 6,
    contractor: 'Harry Potter',
    lastActivity: 1530449195000,
    prev: 210,
    city: 'Hogwart',
    rank: 0,
  },
];

class Contractors extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      contractorsData: this.prepareActivity(contractorsMockedData),
    };
  }

  calculateRank(data) {
    let calculatedData = _.orderBy(data, ['prev'], ['desc']);
    _.forEach(calculatedData, (value, key) => {
      value.rank = key + 1;
    });
    return calculatedData;
  }

  prepareActivity(data) {
    let preparedActivity = _.forEach(data, value => {
      const days = moment().diff(value.lastActivity, 'days');
      value.activity = moment(moment(value.lastActivity)).fromNow();
      if (days < 7) {
        value.type = 'active';
      } else if (days >= 7 && days < 31) {
        value.type = 'resting';
      } else {
        value.type = 'inactive';
      }
    });
    preparedActivity = this.calculateRank(preparedActivity);
    return preparedActivity;
  }

  render() {
    const { contractorsData } = this.state;
    return (
      <div className="Contractors">
        <ActionBar />
        <Stats />
        <Box>
          <Table dataSource={contractorsData} className="Contractors__table" bordered>
            <Column
              align="center"
              dataIndex="rank"
              defaultSortOrder="ascend"
              sorter={(a, b) => a.rank - b.rank}
              title="Rank"
            />
            <Column align="center" dataIndex="contractor" title="Contractor" />
            <Column
              align="center"
              dataIndex="activity"
              title="Activity"
              className="Contractors__activity"
              render={(text, record) => {
                let activeClass = 'Contractors--' + record.type;
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
            <Column align="center" dataIndex="city" title="City" />
          </Table>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Contractors);
