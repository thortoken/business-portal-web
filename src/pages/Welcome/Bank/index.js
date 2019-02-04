import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import Dwolla from '~components/Dwolla';
import Config from '~services/config';
import './Bank.scss';

export class Bank extends React.Component {
  static propTypes = {
    getIavToken: PropTypes.func.isRequired,
    createIAVFundingSource: PropTypes.func.isRequired,
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

  componentDidMount() {
    const { getIavToken } = this.props;
    getIavToken({ type: 'tenants' });
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
    const { createIAVFundingSource } = this.props;
    await createIAVFundingSource({ uri });
  };
}

const mapStateToProps = state => ({
  iavToken: state.iav.iavToken,
  isLoading: state.loading.effects.tenants.createFundingSourceWithIAV,
  iavIsLoading: state.loading.effects.iav.getIavToken,
});

const mapDispatchToProps = dispatch => ({
  createIAVFundingSource: dispatch.tenants.createIAVFundingSource,
  changeStep: dispatch.welcome.changeStep,
  getIavToken: dispatch.iav.getIavToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(Bank);
