import React from 'react';

import { Button, Checkbox } from 'antd';

import './Welcome.css';

export class Welcome extends React.Component {
  state = {
    agreeChecked: false,
  };
  render() {
    return (
      <div className="Welcome">
        <div className="Welcome__register">
          <div className="img__wrapper">
            <img src="/images/Thor_sale-icon.png" alt="" />
            <div />
          </div>
          <div className="Welcome__msg">Welcome to Thor</div>
          <div className="Welcome__accept">
            By signing up you agree to our Thor Technologies{' '}
            <a href="https://www.gothor.com/mobile-and-website-terms-and-conditions" target="_blank">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="https://www.gothor.com/privacy-policy" target="_blank">
              Privacy Policy
            </a>{' '}
            as well as our partner Dwolla's{' '}
            <a href="https://www.dwolla.com/legal/tos?access" target="_blank">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="https://www.dwolla.com/legal/privacy/" target="_blank">
              Privacy Policy
            </a>
          </div>

          {!this.state.agreeChecked && (
            <div className="Welcome__termscheckbox">
              <Checkbox onChange={this.onAgreeChecked} checked={this.state.agreeChecked} />
              <span className="Welcome__termscheckbox--text"> I agree </span>
            </div>
          )}

          <div className="Welcome__btn">
            <Button
              type="primary"
              size="large"
              onClick={this.handleNextStep}
              disabled={!this.state.agreeChecked}>
              Create account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  onAgreeChecked = e => {
    if (e.target.checked) {
      this.setState({ agreeChecked: true });
    } else {
      this.setState({ agreeChecked: false });
    }
  };

  handleNextStep = () => {
    this.props.history.push(`register/contractor`);
  };
}

export default Welcome;
