import React from 'react';
import passwordValidator from 'password-validator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginTwitter, loginGoogle, register } from '../redux/actions/login';

class Register extends React.Component {
  state = {
    email: '',
    password: '',
    password2: '',
    captchaVerfied: false,
    tooltipMsg: 'Please fill in this field.',
    tooltipTopCSS: 0,
    toolTipDisplay: 'none',
    displayError: 'none',
    errorMsg: '',
  };
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.login.registerError === true &&
      nextProps.login.registerError !== this.props.login.registerError
    ) {
      this.setState({ 
        displayError: 'block',
        errorMsg: nextProps.login.registerErrorMsg,
      });
    }
  }
  render() {
    return (
      <div data-w-id="fd910b6f-3c58-69d2-e4e0-fff6f11f0166" className="whitelist-reg non-fixed">
        <div className="part-2">
          <div className="wlp-image-div">
            <img
              alt=""
              src="images/TokenSale_Step1-Register-dot.png"
              width="400"
              srcSet="images/TokenSale_Step1-Register-dot-p-500.png 500w, images/TokenSale_Step1-Register-dot.png 800w"
              sizes="(max-width: 479px) 84vw, 400px"
              className="ts-process"
            />
          </div>
          <h1 className="small-h1">Whitelist Registration</h1>
          <div className="sm-text">
            Already registered?{' '}
            <a href="sign-in" className="link">
              Sign in
            </a>
          </div>
          <div className="email-pass-form w-form">
            <form
              id="wf-form-Register-Form"
              name="wf-form-Register-Form"
              data-name="Register Form"
              data-redirect="http://tokensale.webflow.io/info"
              redirect="http://tokensale.webflow.io/info">
              <label htmlFor="name" className="field-label">
                Email
              </label>
              <input
                type="email"
                className="style-input w-input"
                maxLength="256"
                name="email"
                data-name="Email"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={this.handleInputChange}
                id="name"
              />
              <label htmlFor="password" className="field-label">
                Create a password
              </label>
              <input
                type="password"
                className="style-input w-input"
                maxLength="256"
                name="password"
                data-name="password"
                placeholder="Create a password"
                value={this.state.password}
                onChange={this.handleInputChange}
                id="password"
                required=""
              />
              <label htmlFor="password-3" className="field-label">
                Match that password
              </label>
              <input
                type="password"
                className="style-input w-input"
                maxLength="256"
                name="password2"
                data-name="Password 2"
                placeholder="Repeat password"
                id="password-2"
                value={this.state.password2}
                onChange={this.handleInputChange}
                required=""
              />
              <div className="w-form-fail" style={{ display: this.state.displayError }}>
                <div>{ this.state.errorMsg }</div>
              </div>
              <input
                type="submit"
                value="Next"
                data-wait="Please wait..."
                className="sign-up-btn grey w-button"
                onClick={this.handleSubmit}
              />
              <div className="or">OR</div>
              <a onClick={this.handleGoogleSignIn} className="sign-up-btn google w-inline-block">
                <img
                  alt=""
                  src="images/WhiteG.png"
                  width="30"
                  srcSet="images/WhiteG-p-500.png 500w, images/WhiteG.png 654w"
                  sizes="30px"
                  className="button-icon"
                />
                <div className="sign-in-with-g">Sign up with Google</div>
              </a>
              <a onClick={this.handleTwitterSignIn} className="sign-up-btn google w-inline-block">
                <img
                  alt="" 
                  src="images/twitter-tinywhitebird.png" 
                  width="40" 
                  className="button-icon" 
                />
                <div className="sign-in-with-g">Sign up with Twitter</div>
              </a>
              <div
                className="tooltip"
                style={{
                  top: this.state.tooltipTopCSS,
                  display: this.state.toolTipDisplay,
                }}>
                <img
                  alt="" 
                  src="images/please_fill_in.png" 
                  width="50" 
                  className="warning-icon" 
                />
                <div className="warning-text">{this.state.tooltipMsg}</div>
                <div className="tooltip-arrow" />
              </div>
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
  handleVerification = response => {
    this.setState({ captchaVerfied: true });
  };
  handleTwitterSignIn = event => {
    this.props.loginTwitter();
  };
  handleGoogleSignIn = event => {
    this.props.loginGoogle();
  };
  handleInputChange = event => {
    const target = event.target;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
      toolTipDisplay: 'none',
      displayError: 'none',
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    let email = this.state.email;
    let pwd = this.state.password;
    let emailReg = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    let passValidator = new passwordValidator();
    passValidator
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits() // Must have digits
      .has()
      .not()
      .spaces();
    let passResult = passValidator.validate(this.state.password, {
      list: true,
    });

    if (!emailReg.test(email)) {
      this.setState({
        tooltipMsg: 'Please enter a valid email',
        tooltipTopCSS: 92,
        toolTipDisplay: 'block',
      });
    } else if (this.state.password === '') {
      this.setState({
        tooltipMsg: 'Please enter a password',
        tooltipTopCSS: 181,
        toolTipDisplay: 'block',
      });
    } else if (passResult.length !== 0) {
      this.setState({
        tooltipTopCSS: 181,
        toolTipDisplay: 'block',
      });
      if (passResult.includes('min')) {
        this.setState({
          tooltipMsg: 'Password needs to be at least 8 characters.',
        });
      } else if (passResult.includes('uppercase')) {
        this.setState({
          tooltipMsg: 'Please include an uppercase character.',
        });
      } else if (passResult.includes('digits')) {
        this.setState({
          tooltipMsg: 'Password must contain at least 1 digit.',
        });
      } else if (passResult.length !== 0) {
        this.setState({
          tooltipMsg: 'Please try a different password',
        });
      }
    } else if (this.state.password !== this.state.password2) {
      this.setState({
        tooltipMsg: "Passwords don't match, please retry",
        tooltipTopCSS: 271,
        toolTipDisplay: 'block',
      });
    } else {
      this.props.register(email, pwd);
    }
  };
}

const mapStateToProps = state => ({
  login: state.login,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      register,
      loginGoogle,
      loginTwitter,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Register);
