import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errorMsg: '',
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.login.loginErrorMsg !== prevState.errorMsg) {
      return { errorMsg: nextProps.login.loginErrorMsg };
    }
    return null;
  }
  render() {
    const { errorMsg } = this.state;

    return (
      <div data-w-id="fd910b6f-3c58-69d2-e4e0-fff6f11f0166" className="whitelist-reg non-fixed">
        <div className="part-2">
          <h1 className="small-h1">Sign In</h1>
          <div className="email-pass-form w-form">
            <form
              id="wf-form-Sign-In-Form"
              name="wf-form-Sign-In-Form"
              data-name="Sign In Form">
              <label htmlFor="name" className="field-label">
                Email
              </label>
              <input
                type="email"
                className="style-input w-input"
                maxLength="256"
                name="email"
                data-name="Name"
                onChange={this.handleInputChange}
                placeholder="Enter your email"
                id="name"
              />
              <label htmlFor="password" className="field-label">
                Password
              </label>
              <input
                type="password"
                className="style-input w-input"
                maxLength="256"
                name="password"
                onChange={this.handleInputChange}
                data-name="password"
                placeholder="Enter you password"
                id="password"
                required=""
              />
              {errorMsg && (
                <div className="w-form-fail">
                  <div>{errorMsg}</div>
                </div>
              )}
              <input
                type="submit"
                value="Next"
                data-wait="Please wait..."
                className="sign-up-btn grey w-button"
                onClick={this.handleLogin}
              />
            </form>
            <div className="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div className="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  handleInputChange = event => {
    const target = event.target;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
      displayError: 'none',
    });
  };
  handleLogin = event => {
    event.preventDefault();
    const { login } = this.props;
    const { email, password } = this.state;
    login({ email, password });
  };
}

const mapState = ({ auth: { user } }) => ({ user });
const mapDispatch = ({ auth: { login }}) => ({ login });

export default connect(
  mapState,
  mapDispatch
)(Login)
