import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// To-do: Update this to include whitelist link and a image for the tweet
const twitterMsgLink =
  'https://www.twitter.com/intent/tweet?text=Just%20signed%20up%20for%20@Thortoken%20ICO%20whitelist!!%20Excited%20for%20the%20Token%20Sale.%20https%3A%2F%2Fsale.thortoken.com%2F';

class JumioSuccess extends React.Component {
  render() {
    return (
      <div data-w-id="fd910b6f-3c58-69d2-e4e0-fff6f11f0166" className="whitelist-reg non-fixed">
        <img
        	alt=""
          src="images/Thor_pureBlue_shadow2x.png"
          width="67"
          srcSet="images/Thor_pureBlue_shadow2x-p-500.png 500w, images/Thor_pureBlue_shadow2x-p-800.png 800w, images/Thor_pureBlue_shadow2x-p-1080.png 1080w, images/Thor_pureBlue_shadow2x.png 1320w"
          sizes="67px"
          className="logo"
        />
        <div className="part-2">
          <div className="wlp-image-div">
            <img
            	alt=""
              src="images/Success.png"
              width="400"
              srcSet="images/Success-p-500.png 500w, images/Success.png 800w"
              sizes="(max-width: 479px) 84vw, 400px"
              className="ts-process"
            />
          </div>
          <h1 className="small-h1">You are currently being verified.</h1>
          <div className="sm-text">
            Thank you for being here, and participating in the Thor Token Whitelist and Token sale!
          </div>
          <a href={twitterMsgLink} target="_blank" className="button sign-up-btn w-button twitter-share-button">
            Tweet this!
          </a>
					<a href={"/status"} className="button sign-up-btn w-button">
            Go to my Status Page
          </a>
          <div className="jumio-embed">
            <img
            	alt=""
              src="images/Whitelist_Share_blue.png"
              width="805"
              srcSet="images/Whitelist_Share_blue-p-500.png 500w, images/Whitelist_Share_blue-p-800.png 800w, images/Whitelist_Share_blue-p-1080.png 1080w, images/Whitelist_Share_blue.png 1920w"
              sizes="(max-width: 479px) 86vw, (max-width: 767px) 89vw, (max-width: 991px) 95vw, 805px"
              className="image-7"
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(JumioSuccess);
