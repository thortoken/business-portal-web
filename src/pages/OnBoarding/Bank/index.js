import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Bank.scss';
import NotificationService from '../../../services/notification';

export class Bank extends React.Component {
  static propTypes = {
    createFundingSource: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.getDwollaFrame();
  }

  render() {
    return (
      <div className="Bank">
        <div className="Bank__form">
          <div dangerouslySetInnerHTML={this.createHTML()} />
        </div>
      </div>
    );
  }

  createHTML = () => {
    return { __html: '<div id="iavContainer" />' };
  };

  getDwollaFrame = async () => {
    const { contractor, token } = this.props;
    let authtoken = token;
    if (contractor) {
      authtoken = contractor.token;
    }
    const tokenKey = await this.props.getIavToken(authtoken);
    if (window.location.href.indexOf('localhost') > 0) {
      window.dwolla.configure('sandbox');
    }
    window.dwolla.iav.start(
      tokenKey,
      {
        container: 'iavContainer',
        microDeposits: false,
        fallbackToMicroDeposits: false,
      },
      this.dwollaCallback
    );
  };

  dwollaCallback = async (err, res) => {
    if (!err) {
      await this.props.setUserFundingSource(res._links['funding-source'].href);
      this.handleSubmitSuccess();
    } else {
      NotificationService.open({
        type: 'failure',
        message: 'Failed',
        description: err.response,
      });
    }
  };

  handleSubmitSuccess = () => {
    const { changeStep } = this.props;
    changeStep(3);
  };
}

const mapStateToProps = state => ({
  contractor: state.onBoarding.contractor,
  token: state.auth.token,
  isLoading: state.loading.effects.onBoarding.createFundingSource,
});

const mapDispatchToProps = dispatch => ({
  getIavToken: dispatch.onBoarding.getIavToken,
  changeStep: dispatch.onBoarding.changeStep,
  setUserFundingSource: dispatch.onBoarding.setUserFundingSource,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bank);
