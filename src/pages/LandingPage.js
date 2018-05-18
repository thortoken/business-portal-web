import React from 'react';
import Countdown from 'react-countdown-now';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSale } from '../redux/actions/login';

class LandingPage extends React.Component {
  state = {
    showInfo: false,
    opacity: 0,
    translateY: 500,
    showDetails: false,
  };

  componentWillMount() {
    this.props.getSale();
  }

  componentDidMount() {
    document.body.classList.toggle('body', true);
  }

  renderCountdown(date) {
    const saleStarted = Date.now() > date;

    return (
      <div>
        <h3 className="sale-title centered">Token Sale has Ended!</h3>
        <h3 className="sale-title centered countdown">Thank you for your support</h3>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="all-sections">
          <section id="tokensale" className="section tokensale">
            <a
              href="https://www.thortoken.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-w-id="405ff6d5-0159-5236-d1eb-fdc4f5d8f48c"
              className="brand _100 w-nav-brand">
              <img
                alt=""
                src="images/Logo-white2x.png"
                width="140"
                srcSet="images/Logo-white2x-p-500.png 500w, images/Logo-white2x.png 1126w"
                sizes="(max-width: 479px) 88vw, 140px"
                data-w-id="74cc22d7-d4bb-9eb7-db4d-977e8d38026c"
                className="image-8 wacky1"
              />
            </a>
            <div className="container w-container">
              <div className="top-tag">
                <div className="underline-tag blue">
                  <h1 className="top-tag white">Token Sale</h1>
                </div>
              </div>
            </div>
            <div className="primary-cont">
              <div className="left-cont">
                <div>
                  <img
                    alt=""
                    src="images/Thor_White-icon.png"
                    srcSet="images/Thor_White-icon-p-500.png 500w, images/Thor_White-icon-p-800.png 800w, images/Thor_White-icon.png 1124w"
                    sizes="300px"
                  />
                </div>
                <div className="tokensale">
                  <img
                    alt=""
                    src="images/NEO_whiteCircle.png"
                    width="65"
                    className="token-icon invisible"
                  />
                  {this.renderCountdown(new Date(Date.parse('12 Mar 2018 00:00:00 GMT')))}
                </div>
              </div>
              <div className="right-cont">
                <div>
                  <h2 className="sale-num xl">${this.props.login.dollars}</h2>
                  <div className="sale-bar">
                    <div
                      className="sale-bar-status rounded sale-progress"
                      style={{ width: '100%' }}
                    />
                    {/* <div className="sale-bar-status _20-percent" />
                    <div className="sale-bar-status middle" />
                    <div className="sale-bar-status last" /> */}
                  </div>
                  <div className="sale-bar dollar-amounts">
                    {/* <div className="sale-bar-status middle amount">
                      <div className="percent-discount">
                        <span className="text-span">+10% </span>
                        <br />$5 M
                      </div>
                    </div>
                    <div className="sale-bar-status last amount">
                      <div className="percent-discount">
                        <span className="text-span">
                          Sale<br xmlns="http://www.w3.org/1999/xhtml" />
                        </span>$5 M
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="current-distrib">
                  <img alt="" src="images/Thor_sale-icon.png" width="65" className="token-icon" />
                  <h2 className="sale-num">23,000,000</h2>
                  <h3 className="sale-title">Thor Token Distribution</h3>
                </div>
                <div className="neo-received">
                  <img
                    alt=""
                    src="images/NEO_whiteCircle.png"
                    width="65"
                    className="token-icon neo"
                  />
                  <h2 className="sale-num">{this.props.login.neo}</h2>
                  <h3 className="sale-title">NEO received</h3>
                </div>
                <div className="neo-received">
                  <h2 className="sale-num">{this.props.login.gas}</h2>
                  <h3 className="sale-title">Gas received</h3>
                </div>
              </div>
            </div>
            <div data-w-id="dde20746-2e9d-04f8-6964-dc7c9087fd36" className="footer-logo">
              <img alt="" src="images/Thor_WM2x.png" width="120" className="footer-brand" />
              <div data-w-id="e0057362-be8d-1d7d-58cd-fda7424b797c" className="small-text">
                Made in San Francisco
              </div>
            </div>
            <div className="social">
              <ul className="social-list">
                <li className="social-item">
                  <a
                    href="https://www.meetup.com/Bay-Area-NEO-Meetup/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-inline-block">
                    <img
                      alt=""
                      src="images/Meetup_W.png"
                      width="100"
                      data-w-id="f92c78bc-5004-2515-d7c8-54aeaca9bf0f"
                      className="social-icon"
                    />
                  </a>
                </li>
                <li className="social-item">
                  <a
                    href="https://medium.com/thorco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-inline-block">
                    <img
                      alt=""
                      src="images/M.png"
                      width="100"
                      data-w-id="d553f576-102b-fff8-6799-99f149528e9e"
                      className="social-icon"
                    />
                  </a>
                </li>
                <li className="social-item">
                  <a
                    href="https://twitter.com/Thortoken"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-inline-block">
                    <img
                      alt=""
                      src="images/Twitter_whiteBird.png"
                      width="100"
                      data-w-id="47c6b254-aaed-52d9-458e-2d6a588a3b0e"
                      className="social-icon"
                    />
                  </a>
                </li>
                <li className="social-item">
                  <a
                    href="https://t.me/joinchat/F-UKj1Md5AilZgV9zU0Dwg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-inline-block">
                    <img
                      alt=""
                      src="images/Telegram.png"
                      width="100"
                      data-w-id="f24577af-9fa3-6fb2-c5a9-02d3c15ccf62"
                      className="social-icon"
                    />
                  </a>
                </li>
                <li className="social-item">
                  <a
                    href="https://www.facebook.com/ThorToken/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-inline-block">
                    <img
                      alt=""
                      src="images/FB_footericon.png"
                      width="100"
                      data-w-id="5a290559-8c85-223e-5bff-4e7419343cd1"
                      className="social-icon"
                    />
                  </a>
                </li>
                <li className="social-item">
                  <a
                    href="https://github.com/thortoken"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-inline-block">
                    <img
                      alt=""
                      src="images/GitHub_socialicon.png"
                      width="100"
                      data-w-id="8e5ade49-bf0e-caf9-7ff0-a94c1f8fe6e5"
                      className="social-icon"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
  handleWhitelistClick = event => {
    event.preventDefault();
    this.setState({ showDetails: true });
    var interval = setInterval(() => {
      this.setState({ opacity: this.state.opacity + 0.05 });
      this.setState({ translateY: this.state.translateY - 25 });
      if (this.state.opacity >= 1) {
        clearInterval(interval); // clear the interval after you run your logic!
      }
    }, 10);
    this.setState({ showInfo: !this.state.showInfo });
  };
  handleRegisterClick = event => {
    event.preventDefault();
    this.props.history.push('register');
  };
}

const mapStateToProps = state => ({
  login: state.login,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSale,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
