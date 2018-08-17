import React from 'react';
import { Icon, Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import Dropdown from '~components/Dropdown';
import BackBtn from '~components/BackBtn';

import Filters from './Filters';

import './Contractor.css';

const { Column } = Table;

// import { generateMenuItems } from './../../routes/AuthorizedRoutes/components/Topbar/ManageAccount';

const generateMenuItems = (list, contractorId) => {
  return list.map(element => {
    console.log('list', list, element, contractorId);

    return {
      key: element.key,
      value: (
        <div onClick={element.action}>
          <span>{element.label}</span>
        </div>
      ),
      className: element.className || '',
    };
  });
};

class Contractor extends React.Component {
  constructor(props) {
    super(props);

    this.generateMenuItems = generateMenuItems;
  }

  render() {
    const { match } = this.props;

    console.log('match', match);
    const menuList = [
      {
        key: 'edit',
        action: this.handleEdit,
        label: 'Edit Details',
      },
      {
        key: 'delete',
        action: this.handleDelete,
        label: 'Delete Contractor',
      },
    ];

    console.log('params', this.props.match.params);
    return (
      <div className="Contractor">
        <BackBtn to="/payments" label="Payments" />
        <div className="Contractor-box-informations">
          <div className="Contractor-basic-data">
            <div className="Contractor-name">Owen Dilson</div>
            <div className="Contractor-since">Contractor since 08/10/2016</div>
          </div>
          <div className="Contractor-activity">
            <div className="Activity-active">
              Active Today
              {/* do this as separate component */}
            </div>
          </div>
        </div>
        <div className="Contractor-box-informations">
          <div className="Contractor-address">
            <div className="Contractor-label">Address</div>
            <div className="Contractor-value">380 Dillard Ave #15 San Francisco CA 94105</div>
          </div>
          <div className="Contractor-phone">
            <div className="Contractor-label">Phone</div>
            <div className="Contractor-value">(408)555-2345</div>
          </div>
          <div className="Contractor-options">
            <Dropdown
              className="Contractor-options-btn"
              options={this.generateMenuItems(menuList, match.params.id)}
              onClick={this.handleTransactionsPeriodChange}>
              <Button type="primary" ghost>
                Options
              </Button>
            </Dropdown>
          </div>
        </div>

        <div className="Contractor-jobs-summary">{/* separate component */}</div>

        <Filters />

        <div className="Contractor-table">
          <Table dataSource={[]} bordered>
            <Column align="center" dataIndex="key" title="Date" width="15%" />
            <Column align="center" dataIndex="contractor" width="35%" title="Service" />
            <Column align="center" dataIndex="numOfJobs" title="Location" width="25%" />
            <Column align="center" dataIndex="contractorId" title="Pay Amt." width="25%" />
          </Table>
        </div>
      </div>
    );
  }

  handleDelete = () => {
    const { match } = this.props;
    console.log('delete contractor', match.params.id);
  };

  handleEdit = () => {
    const { match } = this.props;
    console.log('edit contractor', match.params.id);
  };
}

export default Contractor;
