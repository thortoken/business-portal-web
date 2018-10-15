import React from 'react';

import { Button, Checkbox } from 'antd';

import PropTypes from 'prop-types';

import './Terms.css';
import connect from 'react-redux/es/connect/connect';
import NotificationService from '../../../services/notification';

export class Terms extends React.Component {
  static propTypes = {
    handleSignUp: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    id: PropTypes.string,
  };
  state = {
    agreeChecked: false,
  };
  render() {
    const { isLoading } = this.props;
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
              onClick={this.handleSubmit}
              loading={isLoading}
              disabled={!this.state.agreeChecked || isLoading}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }

  setAgreement = value => {
    if (value) {
      localStorage.setItem('thor-terms-agreement', 'true');
    } else {
      localStorage.removeItem('thor-terms-agreement');
    }
  };

  handleSubmit = async () => {
    const { checkInvitation, id, handleSignUp } = this.props;
    try {
      let response = await checkInvitation({ id });
      if (response.status === 'pending') {
        handleSignUp();
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        NotificationService.open({
          type: 'error',
          message: err.response.data.error,
          description: 'Try again.',
        });
      }
      console.log(err);
    }
  };

  onAgreeChecked = e => {
    if (e.target.checked) {
      this.setAgreement(true);
      this.setState({ agreeChecked: true });
    } else {
      this.setAgreement(false);
      this.setState({ agreeChecked: false });
    }
  };
}
const mapStateToProps = state => ({
  isLoading: state.loading.effects.invitations.checkInvitation,
});

const mapDispatchToProps = dispatch => ({
  checkInvitation: dispatch.invitations.checkInvitation,
});

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
