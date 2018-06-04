import React from 'react';
import { Button, Divider } from 'antd';

import './ContractorsForm.css';

export default class ContractorsForm extends React.Component {
  render() {
    return (
      <div className="ContractorsForm">
        <Button type="primary" size="large">
          Upload CSV
        </Button>
        <Divider type="vertical" />
        <Button type="primary" ghost size="large">
          Add Contractor
        </Button>
      </div>
    );
  }
}
