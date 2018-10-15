import React from 'react';

import { Button, Checkbox } from 'antd';

import './Terms.css';
import connect from 'react-redux/es/connect/connect';

export class Terms extends React.Component {
  static propTypes = {};
  state = {
    agreeChecked: false,
  };
  render() {
    const { getAgreement } = this.props;
    return (
      <div className="Terms">
        <div className="Terms__register">
          <div className="img__wrapper">
            <img src="/images/Thor_sale-icon.png" alt="" />
            <div />
          </div>
          <div className="Terms__msg">Welcome to Thor</div>
          <div className="Terms__accept">
            By signing up you agree to our Thor Technologies{' '}
            <a
              href="https://www.gothor.com/mobile-and-website-terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer">
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="https://www.gothor.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer">
              Privacy Policy
            </a>{' '}
            as well as our partner Dwolla's{' '}
            <a
              href="https://www.dwolla.com/legal/tos?access"
              target="_blank"
              rel="noopener noreferrer">
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="https://www.dwolla.com/legal/privacy/"
              target="_blank"
              rel="noopener noreferrer">
              Privacy Policy
            </a>
          </div>
          {!this.state.agreeChecked && (
            <div className="Terms__termscheckbox">
              <Checkbox onChange={this.onAgreeChecked} checked={this.state.agreeChecked} />
              <span className="Terms__termscheckbox--text"> I agree </span>
            </div>
          )}
          <div className="Terms__btn">
            <Button
              type="primary"
              size="large"
              onClick={getAgreement}
              disabled={!this.state.agreeChecked}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }

  onAgreeChecked = e => {
    const { saveAgreement } = this.props;
    if (e.target.checked) {
      saveAgreement(true);
      this.setState({ agreeChecked: true });
    } else {
      saveAgreement(false);
      this.setState({ agreeChecked: false });
    }
  };
}

const mapDispatchToProps = dispatch => ({
  saveAgreement: dispatch.onBoarding.saveAgreement,
  getAgreement: dispatch.onBoarding.getAgreement,
});

export default connect(null, mapDispatchToProps)(Terms);
