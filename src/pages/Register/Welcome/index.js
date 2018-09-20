import React from 'react';

import { Button } from 'antd';

import './Welcome.css';

export class Welcome extends React.Component {
  render() {
    return (
      <div className="Welcome">
        <div className="Welcome__register">
          <div className="Welcome__msg">Welcome to thor</div>
          <div className="Welcome__btn">
            <Button type="primary" size="large" onClick={this.handleNextStep}>
              Create account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  handleNextStep = () => {
    this.props.history.push(`register/contractor`);
  };
}

export default Welcome;
