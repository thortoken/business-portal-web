import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import Dwolla from '~components/Dwolla';
import Config from '~services/config';
import './BankInfo.scss';

export class BankInfo extends React.Component {
  static propTypes = {
    getIavToken: PropTypes.func.isRequired,
    createIAVFundingSource: PropTypes.func.isRequired,
    checkStep: PropTypes.func.isRequired,
    iavToken: PropTypes.string,
    isLoading: PropTypes.bool,
    iavIsLoading: PropTypes.bool,
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
      <div className="BankInfo">
        <div className="BankInfo__form">
          <Spin spinning={iavIsLoading || !dwollaConfig.customerToken}>
            {!iavIsLoading &&
              dwollaConfig.customerToken && (
                <div>
                  <div className="BankInfo__warning">Please do not hit refresh.</div>
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
    this.props.checkStep();
  };

  createFundingSource = async ({ uri }) => {
    const { createIAVFundingSource } = this.props;
    await createIAVFundingSource({ uri });
  };
}

const mapStateToProps = state => ({
  iavToken: state.fundingSources.iavToken,
  isLoading: state.loading.effects.tenants.createFundingSourceWithIAV,
  iavIsLoading: state.loading.effects.fundingSources.getIavToken,
});

const mapDispatchToProps = dispatch => ({
  createIAVFundingSource: dispatch.tenants.createIAVFundingSource,
  checkStep: dispatch.welcome.checkStep,
  getIavToken: dispatch.fundingSources.getIavToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(BankInfo);
