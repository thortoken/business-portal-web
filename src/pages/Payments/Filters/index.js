import React from 'react';
import { Button, Icon, Input } from 'antd';

import Dropdown from '~components/Dropdown';

import './Filters.css';

export default class Filters extends React.Component {
  render() {
    return (
      <div className="Filters">
        <Button size="large">
          <Icon type="left" />
        </Button>
        <Dropdown options={['DAY', 'MONTH', 'YEAR']}>
          <Button size="large" type="primary">
            MONTH <Icon type="down" />
          </Button>
        </Dropdown>
        <Button size="large">
          <Icon type="right" />
        </Button>
        <Input.Search
          placeholder="Search..."
          onSearch={value => console.log('Searching for', value)}
        />
        <Button type="primary" size="large">
          Create Report
        </Button>
        <Button ghost size="large">
          Edit contractors
        </Button>
      </div>
    );
  }
}
