import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getToken } from '../redux/actions/jumio';
const JumioClient = window.JumioClient;

class Jumio extends React.Component {
  componentWillMount() {
    this.props.getToken();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.authToken && nextProps.authToken !== this.props.authToken) {
      JumioClient.setVars({
        authorizationToken: nextProps.authToken,
      }).initVerify('JUMIOIFRAME');
    }
    if (nextProps.status.jumio || nextProps.status.comply) {
      this.props.history.push('/status');
    }
  }
  render() {
    var thisIsDiv = '<div id="JUMIOIFRAME" />';
    return (
      <div>
        <div data-w-id="fd910b6f-3c58-69d2-e4e0-fff6f11f0166" className="whitelist-reg non-fixed">
          <div className="wlp-image-div">
            <img
              src="https://uploads-ssl.webflow.com/5a7b77c587d05300019b4000/5a8c7a68d100f20001e32fb9_TokenSale_Verification_inProcess.png"
              width="400"
              srcSet="https://uploads-ssl.webflow.com/5a7b77c587d05300019b4000/5a8c7a68d100f20001e32fb9_TokenSale_Verification_inProcess-p-500.png 500w, https://uploads-ssl.webflow.com/5a7b77c587d05300019b4000/5a8c7a68d100f20001e32fb9_TokenSale_Verification_inProcess.png 800w"
              sizes="(max-width: 479px) 92vw, 400px"
              className="ts-process"
            />
          </div>
          <h1 className="small-h1">Whitelist ID Verification</h1>
          <div className="sm-text">
            Please fill in the following information. All fields are required.
          </div>
          <div className="jumio-embed" dangerouslySetInnerHTML={{ __html: thisIsDiv }} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.jumio.authToken,
  status: state.status,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getToken,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Jumio);
