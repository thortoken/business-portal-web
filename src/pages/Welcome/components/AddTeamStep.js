import React from 'react';
import { Row, Col, Button, Input, Icon } from 'antd';

import Box from '~components/Box';
import Header from '~components/Header';

import './AddTeamStep.css';

export default class AddTeamStep extends React.Component {
  state = {
    companyName: '',
  };

  render() {
    const { companyName } = this.state;

    return (
      <Box padding className="AddTeamStep">
        <Header title="Put your brand on things!" size="small" />
        <Row gutter={32} type="flex" align="middle">
          <Col lg={4}>
            <img
              src="https://dummyimage.com/118x118/d8d8d8/fff.png&text=+"
              className="AddTeamStep-logo"
            />
          </Col>
          <Col lg={16}>
            <Row gutter={32}>
              <Col lg={24}>
                <Input
                  name="companyName"
                  onChange={this.handleInputChange}
                  placeholder="Company Name"
                  size="large"
                  value={companyName}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col lg={12}>
                <Button type="primary">
                  Select logo file <Icon type="down" />
                </Button>
              </Col>
              <Col lg={12}>input</Col>
            </Row>
          </Col>
          <Col lg={4}>
            <Button size="large">Publish</Button>
          </Col>
        </Row>
      </Box>
    );
  }

  handleInputChange = evt => this.setState({ [evt.target.name]: evt.target.value });
}
