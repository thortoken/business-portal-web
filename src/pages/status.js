import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getStatus, resetKYC, updateNEOAddress } from '../redux/actions/status';
import { logout } from '../redux/actions/login';

class Status extends React.Component {
  state = {
    neo_wallet: '',
    walletError: false,
    showUpdate: false,
  };
  componentDidMount() {
    if (this.isNullOrUndefined(this.props.status.info)) {
      this.props.getStatus();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      !this.isNullOrUndefined(nextProps.status.info) &&
      nextProps.status.info !== this.props.status.info
    ) {
      this.render();
    }
  }
  render() {
    // let meow = this.props.status;

    return (
      <div data-w-id="fd910b6f-3c58-69d2-e4e0-fff6f11f0166" className="whitelist-reg non-fixed">
        <img
          alt=""
          src="https://uploads-ssl.webflow.com/5a7b77c587d05300019b4000/5a7b77c587d05300019b401e_THOR-icon.png"
          width="67"
          className="logo"
        />
        <div className="w-container">
          <div className="kyc-aml-div">
            <h1 className="small-h1">Your Thor Whitelist Status</h1>
            <div className="sm-text">
              You will need to pass the <em>Know Your Customer</em> and{' '}
              <em>Anti-Money Laundering</em> tests to participate.
            </div>
          </div>
          {this.renderResetJumio()}
          {this.renderStatus()}
          {this.showIsWhitelisted()}
        </div>
        <button className="secondary-btn" onClick={this.logout}>
          Sign Out
        </button>
        <div className="kyc support">
          <div className="support-text">
            If you need help, please{' '}
            <a href="https://thortoken.zendesk.com/hc/en-us/requests/new" target="_blank">
              contact support
            </a>
          </div>
        </div>
      </div>
    );
  }
  isNullOrUndefined(info) {
    return info === null || info === undefined;
  }
  renderStatus() {
    if (this.isNullOrUndefined(this.props.status.info)) {
      return (
        <div className="kyc">
          <h2 className="status-heading">Your information is being verified.</h2>
        </div>
      );
    } else {
      return (
        <div>
          {this.displayAffirmed(this.props.status.info.jumio, 'KYC')}
          {this.displayAffirmed(this.props.status.info.comply, 'AML')}
          {this.updateNEOAddress()}
        </div>
      );
    }
  }
  showIsWhitelisted = () => {
    if (
      this.props.status.info &&
      this.props.status.info.jumio === 'PASSED' &&
      this.props.status.info.comply === 'PASSED'
    ) {
      return (
        <div className="kyc">
          <h4 className="status-heading">
            <b>You've been whitelisted! Note that adding your address to the smart contract can take at most 24 hours.</b>
            <br />
            <br />
            <span>
              <a href="https://medium.com/thorco/how-to-participate-in-the-thor-token-sale-17a8e748087d">
                How to participate in the Thor Token sale
              </a>
            </span>
            <br />
            <span>{`Contract Script Hash: 67a5086bac196b67d5fd20745b0dc9db4d2930ed`}</span>
          </h4>
        </div>
      );
    }
  };
  updateNEOAddress = () => {
    const re = new RegExp('A[0-9a-zA-Z]{33}', 'g');

    if (re.test(this.props.status.info.neo_wallet) && !this.state.showUpdate) {
      return (
        <div className="kyc">
          <h4 className="status-heading">
            <b>Your NEO Address:</b> {` ` + this.props.status.info.neo_wallet + ` `}
            {/* <a href="#" onClick={this.showUpdate}>
              edit
            </a> */}
          </h4>
        </div>
      );
    } else {
      return (
        <div>
          <div className="kyc">
            <h4 className="status-heading">
              <b>Your NEO Address:</b> {` ` + this.props.status.info.neo_wallet}
            </h4>
          </div>
          <form>
            <label htmlFor="neo_wallet">Update NEO Address</label>
            <input
              type="text"
              className="style-input w-input"
              ref="neo_wallet"
              maxLength="256"
              name="neo_wallet"
              data-name="NEO"
              placeholder="Enter your public NEO address"
              id="neo_wallet"
              required=""
              onChange={this.handleInputChange}
              value={this.state.neo_wallet}
            />
            {this.state.walletError && `Invalid wallet address`}
          </form>
          <button onClick={this.updateAddressClick} className="primary-btn">
            Update NEO Address
          </button>
        </div>
      );
    }
  };
  showUpdate = () => {
    this.setState({ showUpdate: true });
  };
  updateAddressClick = () => {
    const re = new RegExp('A[0-9a-zA-Z]{33}', 'g');
    if (re.test(this.state.neo_wallet)) {
      this.props.updateNEOAddress(this.state.neo_wallet);
      this.setState({ showUpdate: false });
    } else {
      this.setState({ walletError: true });
      setTimeout(() => {
        this.setState({ walletError: false });
      }, 3000);
    }
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      toolTipDisplay: 'none',
    });
  };
  displayAffirmed = (status, label) => {
    if (status === 'PASSED') {
      return (
        <div className="kyc">
          <img
            alt=""
            src="https://uploads-ssl.webflow.com/5a7b77c587d05300019b4000/5a984194ba4d6f0001d641a6_KYC-AML_Approved.png"
            width="60"
            className="status-icon"
          />
          <h2 className="status-heading">Your {label} information has been approved</h2>
        </div>
      );
    } else {
      return (
        <div className="kyc">
          <img
            alt=""
            src="https://uploads-ssl.webflow.com/5a7b77c587d05300019b4000/5a9841ac54b458000132e3e4_KYC-AML_fail.png"
            width="60"
            className="status-icon"
          />
          <h2 className="status-heading">Your {label} information was not approved</h2>
        </div>
      );
    }
  };
  renderResetJumio() {
    if (
      !this.isNullOrUndefined(this.props.status.info) &&
      this.props.status.info.jumio !== 'PASSED'
    ) {
      return (
        <button onClick={this.resetKYC} className="primary-btn">
          Reset KYC
        </button>
      );
    }
    return undefined;
  }
  logout = () => {
    this.props.logout();
  };
  resetKYC = () => {
    this.props.resetKYC();
  };
}

const mapStateToProps = state => ({
  status: state.status,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getStatus,
      logout,
      resetKYC,
      updateNEOAddress,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Status);
