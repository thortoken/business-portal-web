import React from 'react';
import { Input, Button } from 'antd';

import InputGroup from '~components/InputGroup/index';

import './EditContractor.css';

class EditContractor extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="Edit-contractor">
        <InputGroup title="first name" isHalf>
          <Input placeholder="" className="Input-group--input" />
        </InputGroup>
        <InputGroup title="last name" isHalf>
          <Input placeholder="" className="Input-group--input" />
        </InputGroup>
        <InputGroup title="d-o-b" isHalf>
          <Input placeholder="" className="Input-group--input" />
        </InputGroup>
        <InputGroup title="last 4 digits of ssn" isHalf>
          <Input placeholder="" className="Input-group--input" />
        </InputGroup>
        <InputGroup title="email" isHalf>
          <Input placeholder="" className="Input-group--input" />
        </InputGroup>
        <InputGroup title="phone" isHalf>
          <Input placeholder="" className="Input-group--input" />
        </InputGroup>
        <InputGroup title="address" isHalf>
          <Input placeholder="" className="Input-group--input" />
        </InputGroup>
        <InputGroup title="city" isHalf>
          <Input placeholder="" className="Input-group--input" />
        </InputGroup>
        <InputGroup title="address2" isHalf>
          <Input placeholder="" className="Input-group--input" />
        </InputGroup>
        <InputGroup title="state" isHalf>
          <Input placeholder="" className="Input-group--input" />
        </InputGroup>
        <InputGroup title="zip" isHalf>
          <Input placeholder="" className="Input-group--input" />
        </InputGroup>
        <div className="Edit-contractor__button-container">
          <Button size="large" type="primary" className="Edit-contractor__button-container--button">
            Edit
          </Button>
        </div>
      </div>
    );
  }
}

export default EditContractor;
