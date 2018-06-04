import React from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { TextField, SelectField } from 'redux-form-antd';
import { Button, Row, Col } from 'antd';

import Actions from '~components/Actions';

const permissions = [
  { label: 'First permission', value: 'p1' },
  { label: 'Second permission', value: 'p2' },
];

export class TeamMembers extends React.Component {
  render() {
    const { fields } = this.props;

    return (
      <div>
        {fields.map((member, index) => (
          <Row key={index} gutter={32} type="flex" align="middle">
            <Col style={{ flexGrow: 1 }}>
              <Field component={TextField} name={`${member}.name`} placeholder="Name" />
            </Col>
            <Col style={{ flexGrow: 1 }}>
              <Field component={TextField} name={`${member}.email`} placeholder="Email" />
            </Col>
            <Col>
              <Field
                component={SelectField}
                name={`${member}.permissions`}
                placeholder="PERMISSIONS"
                options={permissions}
                hasFeedback={false}
              />
            </Col>
            <Col>
              <Button
                type="danger"
                icon="user-delete"
                htmlType="submit"
                onClick={this.handleDelete(index)}>
                Delete
              </Button>
            </Col>
          </Row>
        ))}
        <Actions position="bottom">
          <Actions.Left>
            <Button ghost icon="user-add" size="large" onClick={this.handleAdd}>
              Add member
            </Button>
          </Actions.Left>
          <Actions.Right>
            <Button type="secondary" icon="mail" size="large" htmlType="submit">
              Send invite
            </Button>
          </Actions.Right>
        </Actions>
      </div>
    );
  }

  handleAdd = () => this.props.fields.push({});
  handleDelete = index => () => this.props.fields.remove(index);
}

export class TeamMembersForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <FieldArray name="teamMembers" component={TeamMembers} />
      </form>
    );
  }
}

export default reduxForm({
  form: 'team-members',
})(TeamMembersForm);
