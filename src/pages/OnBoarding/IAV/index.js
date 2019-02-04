import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dwolla from '~components/Dwolla';
import { Spin } from 'antd';

import './IAV.scss';
import Config from '~services/config';

export class IAV extends React.Component {
  static propTypes = {
    createFundingSourceWithIAV: PropTypes.func.isRequired,
  };
  state = {
    dwollaConfig: {
      backButton: false,
      customerToken: null,
      environment: Config.env === 'dev' ? 'sandbox' : 'prod',
      fallbackToMicroDeposits: false,
      microDeposits: false,
      stylesheets: [],
      subscriber: () => {},
    },
  };

  constructor(props) {
    super(props);
    props.getIavToken({ type: 'contractors' });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let localState = {};
    if (nextProps.iavToken !== null) {
      localState['dwollaConfig'] = { ...prevState.dwollaConfig, customerToken: nextProps.iavToken };
    }
    return Object.keys(localState).length ? localState : null;
  }

  render() {
    const { dwollaConfig } = this.state;
    const { iavIsLoading } = this.props;

    const onError = err => {
      console.log('err', err);
    };
    return (
      <div className="IAV">
        <div className="IAV__form">
          <Spin spinning={iavIsLoading || !dwollaConfig.customerToken}>
            {!iavIsLoading &&
              dwollaConfig.customerToken && (
                <div>
                  <div className="IAV__warning">Please do not hit refresh.</div>
                  <Dwolla
                    onSuccess={this.handleIAVSuccess}
                    onError={onError}
                    dwollaConfig={dwollaConfig}
                  />
                </div>
              )}
          </Spin>
        </div>
      </div>
    );
  }

  handleIAVSuccess = async uri => {
    await this.createFundingSource({ uri });
    this.handleSubmitSuccess();
  };

  handleSubmitSuccess = () => {
    const { changeStep } = this.props;
    changeStep(3);
  };

  createFundingSource = async ({ uri }) => {
    const { createFundingSourceWithIAV } = this.props;
    await createFundingSourceWithIAV({
      bank: { uri },
    });
  };
}

const mapStateToProps = state => ({
  contractor: state.onBoarding.contractor,
  iavToken: state.iav.iavToken,
  isLoading: state.loading.effects.onBoarding.createFundingSourceWithIAV,
  iavIsLoading: state.loading.effects.iav.getIavToken,
});

const mapDispatchToProps = dispatch => ({
  createFundingSourceWithIAV: dispatch.onBoarding.createFundingSourceWithIAV,
  changeStep: dispatch.onBoarding.changeStep,
  getIavToken: dispatch.iav.getIavToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(IAV);
