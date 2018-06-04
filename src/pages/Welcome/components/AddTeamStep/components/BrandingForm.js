import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-antd';
import { Row, Col, Button, Icon } from 'antd';

export class BrandingForm extends Component {
  render() {
    const { onSubmit, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={32} type="flex" align="middle" justify="end">
          <Col>
            <img
              src="https://dummyimage.com/118x118/d8d8d8/fff.png&text=+"
              className="AddTeamStep-logo"
            />
          </Col>
          <Col style={{ flexGrow: 1 }}>
            <Row gutter={32}>
              <Col>
                <Field name="companyName" component={TextField} placeholder="Company Name" />
              </Col>
            </Row>
            <Row gutter={32} type="flex">
              <Col>
                <Button type="primary">
                  Select logo file <Icon type="down" />
                </Button>{' '}
              </Col>
              <Col>
                <Button type="primary" ghost>
                  Select brand color <Icon type="down" />
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Button size="large" type="secondary" htmlType="submit">
              Publish
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default reduxForm({
  form: 'branding',
})(BrandingForm);
