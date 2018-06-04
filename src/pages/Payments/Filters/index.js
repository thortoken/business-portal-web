import React from 'react';
import { Button, Icon, Input } from 'antd';

import Dropdown from '~components/Dropdown';

import './Filters.css';

export default class Filters extends React.Component {
  state = {
    chartPeriod: 'MONTH',
  };

  render() {
    const { chartPeriod } = this.state;

    return (
      <div className="Filters">
        <div className="Filters-period-selector">
          <Button>
            <Icon type="left" />
          </Button>
          <Dropdown options={['DAY', 'MONTH', 'YEAR']} onClick={this.handleChartPeriodChange}>
            <Button type="primary">
              {chartPeriod} <Icon type="down" />
            </Button>
          </Dropdown>
          <Button>
            <Icon type="right" />
          </Button>
        </div>
        <Input.Search
          className="Filters-search"
          placeholder="Search..."
          onSearch={value => console.log('Searching for', value)}
        />
        <div className="Filters-actions">
          <Button type="primary">Create Report</Button>
          <Button ghost>Edit contractors</Button>
        </div>
      </div>
    );
  }

  handleChartPeriodChange = newPeriod => {
    this.setState({ chartPeriod: newPeriod });
  };
}
