import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class JumioFailure extends React.Component {
  render() {
    return (
      <div data-w-id="fd910b6f-3c58-69d2-e4e0-fff6f11f0166" className="whitelist-reg non-fixed">
        <img
          src="images/Thor_pureBlue_shadow2x.png"
          width="67"
          srcSet="images/Thor_pureBlue_shadow2x-p-500.png 500w, images/Thor_pureBlue_shadow2x-p-800.png 800w, images/Thor_pureBlue_shadow2x-p-1080.png 1080w, images/Thor_pureBlue_shadow2x.png 1320w"
          sizes="67px"
          className="logo"
        />
        <div className="part-2">
          <div className="wlp-image-div">
            <h3 className="heading not-right">It looks like something&#x27;s not quite right.</h3>
          </div>
          <div className="text-container">
            <h1 className="small-h1">We had trouble with your submission.</h1>
            <div className="sm-text">
              Thank you for being here, and your interest in participating in the Thor Token
              Whitelist and Token sale! We apologize for the inconvenience. If you feel there has
              been an error, please reach out to{' '}
              <a href="#" className="link-2">
                support here
              </a>.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.jumio.authToken,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(JumioFailure);
